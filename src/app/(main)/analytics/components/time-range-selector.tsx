"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TimeFrame } from "@/types/views.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const timeRanges = [
  { label: "Today", value: TimeFrame.TODAY },
  { label: "This Week", value: TimeFrame.THIS_WEEK },
  { label: "This Month", value: TimeFrame.THIS_MONTH },
  { label: "This Year", value: TimeFrame.THIS_YEAR },
];

export default function TimeRangeSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTimeFrame = searchParams.get("timeFrame") || TimeFrame.THIS_WEEK;

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    const params = new URLSearchParams(searchParams);
    params.set("timeFrame", timeFrame);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Card className="bg-[#F8FAFC] border-[#E2E8F0] shadow-sm md:col-span-3">
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {timeRanges.map(({ label, value }) => (
            <Button
              key={value}
              variant="outline"
              size="sm"
              className={`${
                currentTimeFrame === value ? "bg-[#2563EB] text-white" : ""
              }`}
              onClick={() => handleTimeFrameChange(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
