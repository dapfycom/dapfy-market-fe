"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeFrame } from "@/types/views.type";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface VisitorTrendsGraphProps {
  timeSeriesData: Array<{
    date: string;
    views: number;
    uniqueVisitors: number;
  }>;
  timeFrame: TimeFrame;
}

function formatHour(hour: number): string {
  const period = hour >= 12 ? "AM" : "PM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
}

function formatMonthDay(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function VisitorTrendsGraph({
  timeSeriesData,
  timeFrame,
}: VisitorTrendsGraphProps) {
  const groupedData = timeSeriesData.reduce((acc, item) => {
    const date = new Date(item.date);
    let key;
    let displayKey;

    switch (timeFrame) {
      case TimeFrame.TODAY:
        key = date.getUTCHours();
        displayKey = formatHour(key);
        break;
      case TimeFrame.THIS_WEEK:
        key = date.toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "UTC",
        });
        displayKey = key;
        break;
      case TimeFrame.THIS_MONTH:
        key = date.getUTCDate();
        displayKey = formatMonthDay(date);
        break;
      case TimeFrame.THIS_YEAR:
        key = date.toLocaleDateString("en-US", {
          month: "short",
          timeZone: "UTC",
        });
        displayKey = key;
        break;
      default:
        key = item.date;
        displayKey = key;
    }

    if (!acc[key]) {
      acc[key] = { date: displayKey, views: 0, uniqueVisitors: 0 };
    }

    acc[key].views += item.views;
    acc[key].uniqueVisitors += item.uniqueVisitors;

    return acc;
  }, {} as Record<string | number, { date: string; views: number; uniqueVisitors: number }>);

  const formattedData = Object.values(groupedData);

  return (
    <Card className="bg-[#F8FAFC] border-[#E2E8F0] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1E293B]">
          Visitor Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#475569" }}
              tickMargin={10}
            />
            <YAxis tick={{ fontSize: 12, fill: "#475569" }} tickMargin={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "14px",
                color: "#334155",
                paddingTop: "20px",
              }}
            />
            <Line
              name="Total Views"
              type="monotone"
              dataKey="views"
              stroke="#2563EB"
              strokeWidth={2}
              dot={false}
            />
            <Line
              name="Unique Visitors"
              type="monotone"
              dataKey="uniqueVisitors"
              stroke="#64748B"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
