import Charts from "@/components/Charts";
import DueDateCalendar from "@/components/DueDateCalendar";
import { PregHealthTips } from "@/components/PregHealthTips";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { $Enums } from "@prisma/client";

import { nanoid } from "nanoid";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description:
    "MaternaAI is an AI-powered platform for creating and managing personalized digital experiences.",
};

interface HealthRecord {
  id: string;
  date: Date;
  systolic: number;
  diastolic: number;
  weight: number;
}

async function getHealthData(): Promise<{
  bloodPressure: HealthRecord[];
  weight: HealthRecord[];
}> {
  const { user } = await validateRequest();

  // Fetch health data from the database
  const healthData = await prisma.healthMetric.findMany({
    where: {
      userId: user?.id,
      // Filter data within the last 14 days
      createdAt: {
        gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Organize data by date
  const dataByDate: {
    [date: string]: {
      id: string;
      userId: string;
      metricType: $Enums.MetricType;
      value: string;
      createdAt: Date;
    }[];
  } = healthData.reduce((acc: any, data) => {
    const dateKey = data.createdAt.toISOString().split("T")[0]; // Date without time
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(data);
    return acc;
  }, {});

  // Fill in missing dates with data from the previous day or zeros
  const currentDate = new Date();
  let previousDayData: any = null;
  const healthRecords = Array.from({ length: 14 }).map((_, index) => {
    const date = new Date(currentDate.getTime() - index * 24 * 60 * 60 * 1000);
    const dateKey = date.toISOString().split("T")[0];
    const dataForDate = dataByDate[dateKey] || [];

    // Use the most recent data for the day if available, otherwise use previous day's data
    if (dataForDate.length > 0) {
      previousDayData = dataForDate[0];
    }

    const bloodPressureData = dataForDate.find(
      (metric: any) => metric.metricType === "BLOODPRESSURE",
    );
    const weightData = dataForDate.find(
      (metric: any) => metric.metricType === "WEIGHT",
    );

    return {
      id: previousDayData ? previousDayData.id : nanoid(),
      date: date,
      systolic: bloodPressureData
        ? parseInt(bloodPressureData.value.split("/")[0])
        : 0,
      diastolic: bloodPressureData
        ? parseInt(bloodPressureData.value.split("/")[1])
        : 0,
      weight: weightData ? parseInt(weightData.value) : 0,
    };
  });

  // Return the last 14 days of health data
  const sortedHealthRecords = healthRecords.reverse(); // Sort from oldest to newest
  return {
    bloodPressure: sortedHealthRecords.map(
      ({ id, date, systolic, diastolic }) => ({
        id,
        date,
        systolic,
        diastolic,
        weight: 0, // Include weight as 0 to maintain structure
      }),
    ),
    weight: sortedHealthRecords.map(({ id, date, weight }) => ({
      id,
      date,
      systolic: 0, // Include systolic and diastolic as 0 to maintain structure
      diastolic: 0,
      weight,
    })),
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

// I want this function to be populate for the last 14days, if more than one data for a particular day then use the most recent data as the data for that day, if the data for a particular day is missing from the database and there's data for the previous day it can assume the data to be same as the previous day, but if no data before it populate with 0 and also filter the data from old to new.
