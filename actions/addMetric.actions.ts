"use server";

import { validateRequest } from "@/lib/auth";
import { HealthMetricSchema } from "./../types/index";
import prisma from "@/lib/prismadb";
import { z } from "zod";

export async function addHealthMetricToDB(
  data: z.infer<typeof HealthMetricSchema>,
) {
  try {
    const { user } = await validateRequest();
    const addHeath = await prisma.healthMetric.create({
      data: {
        metricType: data.metricType,
        value: data.value,
        userId: user?.id!,
      },
    });

    return {
      success: true,
      data: addHeath,
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error?.message,
    };
  }
}
