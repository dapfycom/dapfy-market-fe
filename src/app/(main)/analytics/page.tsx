import { FramerDiv, FramerH1 } from "@/components/framer";
import { TimeFrame } from "@/types/views.type";
import { BASE_URL } from "@/utils/axios";
import dynamic from "next/dynamic";
import TimeRangeSelector from "./components/time-range-selector";
import TopCountriesTable from "./components/top-countries-table";
import TopPagesTable from "./components/top-pages-table";
import { TrafficOverview } from "./components/traffic-overview";
import TrafficSourcesChart from "./components/traffic-sources-chart";
const VisitorTrendsGraph = dynamic(
  () => import("./components/visitor-trends-graph"),
  { ssr: false }
);
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

interface AnalyticsData {
  totalStats: {
    totalViews: number;
    uniqueVisitors: number;
  };
  pathStats: Array<{
    path: string;
    views: number;
    uniqueVisitors: number;
  }>;
  sourceStats: Array<{
    source: string;
    views: number;
  }>;
  countryStats: Array<{
    country: string;
    visitors: number;
    percentage: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    views: number;
    uniqueVisitors: number;
  }>;
}

async function getData(timeFrame: TimeFrame): Promise<AnalyticsData> {
  const res = await fetch(
    `${BASE_URL}/views/analytics?timeFrame=${timeFrame}`,
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch analytics data");
  }

  return res.json();
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { timeFrame?: TimeFrame };
}) {
  const timeFrame = searchParams.timeFrame || TimeFrame.THIS_WEEK;
  const data = await getData(timeFrame);

  return (
    <div className="container mx-auto max-w-7xl p-6 space-y-8">
      <FramerH1
        className="text-3xl font-bold tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Analytics
      </FramerH1>
      <FramerDiv
        className="grid gap-8 md:grid-cols-3"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <TimeRangeSelector />
      </FramerDiv>
      <FramerDiv
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <TrafficOverview stats={data.totalStats} />
        <TrafficSourcesChart sourceStats={data.sourceStats} />
      </FramerDiv>
      <FramerDiv
        className="grid gap-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <TopPagesTable pathStats={data.pathStats} />
      </FramerDiv>
      <FramerDiv variants={fadeInUp} initial="initial" animate="animate">
        <TopCountriesTable countryStats={data.countryStats} />
      </FramerDiv>
      <FramerDiv variants={fadeInUp} initial="initial" animate="animate">
        <VisitorTrendsGraph
          timeSeriesData={data.timeSeriesData}
          timeFrame={timeFrame}
        />
      </FramerDiv>
    </div>
  );
}
