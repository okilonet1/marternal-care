"use client";

import { Card, CardHeader } from "@nextui-org/react";
import { FC, useEffect } from "react";

import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CardContent, CardTitle } from "./ui/card";
import { useHealthMetric } from "@/contexts/healthMetricContext";

export const BloodPressureChart: FC = () => {
  const { healthMetrics } = useHealthMetric();

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Blood Pressure</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            width={730}
            height={250}
            data={healthMetrics.bloodPressure}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis label={"mmHg"} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="systolic"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="diastolic"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <Legend verticalAlign="top" height={36} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const WeightChart: FC = () => {
  const { healthMetrics } = useHealthMetric();
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weight</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={healthMetrics.weight}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface ChartsProps {
  bloodPressure: {
    id: String;
    date: Date;
    systolic: number;
    diastolic: number;
  }[];
  weight: { id: String; date: Date; weight: number }[];
}

const Charts: FC<ChartsProps> = ({ bloodPressure, weight }) => {
  const { setHealthMetrics } = useHealthMetric();
  useEffect(() => {
    // Update health metrics context from server
    setHealthMetrics((prev) => ({
      bloodPressure,
      weight,
    }));
    console.log({
      bloodPressure,
      weight,
    });
  }, [bloodPressure, weight]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
      <BloodPressureChart />
      <WeightChart />
    </div>
  );
};

export default Charts;
