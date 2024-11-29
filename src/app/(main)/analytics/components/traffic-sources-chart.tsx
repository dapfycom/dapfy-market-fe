"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrafficSourcesChartProps {
  sourceStats: Array<{
    source: string;
    views: number;
  }>;
}

export default function TrafficSourcesChart({
  sourceStats,
}: TrafficSourcesChartProps) {
  return (
    <Card className="bg-[#F8FAFC] border-[#E2E8F0] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#475569]">
          Traffic Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={sourceStats}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="source"
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Bar dataKey="views" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
