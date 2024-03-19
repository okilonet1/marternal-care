import { $Enums } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";

// Define the initial state for health metrics
const initialHealthMetricsState = {
  bloodPressure: [],
  weight: [],
};

// Create a context for health metrics
const HealthMetricContext = createContext<{
  healthMetrics: {
    bloodPressure: {
      id: String;
      date: Date;
      systolic: number;
      diastolic: number;
    }[];
    weight: { id: String; date: Date; weight: number }[];
  };
  setHealthMetrics: React.Dispatch<
    React.SetStateAction<{
      bloodPressure: {
        id: String;
        date: Date;
        systolic: number;
        diastolic: number;
      }[];
      weight: { id: String; date: Date; weight: number }[];
    }>
  >;
  addHealthMetric: (data: {
    id: string;
    userId: string;
    metricType: $Enums.MetricType;
    value: string;
    createdAt: Date;
  }) => void;
}>({
  healthMetrics: initialHealthMetricsState,
  setHealthMetrics: () => {},
  addHealthMetric: () => {},
});

// Custom hook to use Health Metric Context
export const useHealthMetric = () => {
  const context = useContext(HealthMetricContext);
  if (!context) {
    throw new Error(
      "useHealthMetric must be used within a HealthMetricProvider",
    );
  }
  return context;
};

// Health Metric Provider component
export const HealthMetricProvider = ({ children }: { children: ReactNode }) => {
  // Define state for health metrics
  const [healthMetrics, setHealthMetrics] = useState<{
    bloodPressure: {
      id: String;
      date: Date;
      systolic: number;
      diastolic: number;
    }[];
    weight: { id: String; date: Date; weight: number }[];
  }>(initialHealthMetricsState);

  // Function to add health metric
  const addHealthMetric = (data: {
    id: string;
    userId: string;
    metricType: $Enums.MetricType;
    value: string;
    createdAt: Date;
  }) => {
    setHealthMetrics((prevMetrics) => {
      // Ensure metric type is valid
      const metricType = data.metricType.toLowerCase(); // Convert to lowercase
      if (metricType === "weight") {
        return {
          ...prevMetrics,
          [metricType]: [
            ...prevMetrics[metricType],
            {
              date: data.createdAt,
              id: data.id,
              weight: Number(data.value),
            },
          ],
        };
      } else if (metricType === "bloodpressure") {
        return {
          ...prevMetrics,
          [metricType]: [
            ...prevMetrics["bloodPressure"],
            {
              date: data.createdAt,
              id: data.id,
              systolic: Number(data.value.split("/")[0]),
              diastolic: Number(data.value.split("/")[1]),
            },
          ],
        };
      } else {
        console.error(`Invalid metric type: ${data.metricType}`);
        return prevMetrics;
      }
    });
  };

  return (
    <HealthMetricContext.Provider
      value={{ healthMetrics, setHealthMetrics, addHealthMetric }}
    >
      {children}
    </HealthMetricContext.Provider>
  );
};
