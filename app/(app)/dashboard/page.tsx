import Charts from "@/components/Charts";
import DueDateCalendar from "@/components/DueDateCalendar";
import { PregHealthTips } from "@/components/PregHealthTips";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prismadb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description:
    "MaternaAI is an AI-powered platform for creating and managing personalized digital experiences.",
};

async function getHealthData(): Promise<{
  bloodPressure: {
    id: String;
    date: Date;
    systolic: number;
    diastolic: number;
  }[];
  weight: { id: String; date: Date; weight: number }[];
}> {
  const { user } = await validateRequest();

  const healthData = await prisma.healthMetric.findMany({
    where: {
      userId: user?.id,
    },
  });

  const bloodPressure = healthData
    .filter((metric) => metric.metricType === "BLOODPRESSURE")
    .map((data) => {
      const [systolic, diastolic] = data.value.split("/").map(Number);
      return {
        id: data.id,
        date: data.createdAt,
        systolic,
        diastolic,
      };
    });

  const weight = healthData
    .filter((metric) => metric.metricType === "WEIGHT")
    .map((data) => ({
      id: data.id,
      date: data.createdAt,
      weight: Number(data.value),
    }));

  return {
    bloodPressure,
    weight,
  };
}

export default async function DashboardPage() {
  const healthMetric = await getHealthData();
  return (
    <>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Charts {...healthMetric} />
          <DueDateCalendar />
          <div className="mt-10">
            <PregHealthTips />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
