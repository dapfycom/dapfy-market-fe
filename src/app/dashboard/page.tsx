import { FramerDiv, FramerTableRow } from "@/components/framer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, BarChart2, PieChart } from "lucide-react";
import DashboardContentLayout from "./commons/dashboard-content-layout";
export default function DashboardPage() {
  return (
    <DashboardContentLayout title="Dashboard">
      <FramerDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FramerDiv
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">$124,567.89</p>
            <div className="flex items-center text-green-500 mt-2">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm">12.5% from last month</span>
            </div>
          </FramerDiv>
          <FramerDiv
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold">24</p>
            <div className="flex items-center text-green-500 mt-2">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm">3 new this month</span>
            </div>
          </FramerDiv>
          <FramerDiv
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
            <p className="text-3xl font-bold">1,234</p>
            <div className="flex items-center text-green-500 mt-2">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm">5.2% from last month</span>
            </div>
          </FramerDiv>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personalized Insights</CardTitle>
            <CardDescription>
              AI-powered recommendations for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Your top-selling product &quot;SEO Course&quot; has a 15% higher
                conversion rate than industry average. Consider creating more
                products in this category.
              </li>
              <li>
                Customer retention rate has dropped by 3% this month. We
                recommend launching a re-engagement email campaign.
              </li>
              <li>
                Based on current trends, we forecast a 20% increase in revenue
                next month if you maintain your current growth rate.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart">
              <TabsList>
                <TabsTrigger value="chart">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Chart
                </TabsTrigger>
                <TabsTrigger value="table">
                  <PieChart className="w-4 h-4 mr-2" />
                  Table
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <div className="h-[300px] flex items-center justify-center bg-muted">
                  Interactive chart placeholder
                </div>
              </TabsContent>
              <TabsContent value="table">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 font-semibold">Product</th>
                        <th className="pb-3 font-semibold">Revenue</th>
                        <th className="pb-3 font-semibold">Sales</th>
                        <th className="pb-3 font-semibold">Conversion Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          product: "Digital Marketing eBook",
                          revenue: "$4,499.85",
                          sales: 150,
                          conversionRate: "3.2%",
                        },
                        {
                          product: "SEO Course",
                          revenue: "$7,499.25",
                          sales: 75,
                          conversionRate: "4.5%",
                        },
                        {
                          product: "Social Media Templates",
                          revenue: "$3,998.00",
                          sales: 200,
                          conversionRate: "2.8%",
                        },
                      ].map((item, index) => (
                        <FramerTableRow
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="border-b last:border-b-0"
                        >
                          <td className="py-3">{item.product}</td>
                          <td className="py-3">{item.revenue}</td>
                          <td className="py-3">{item.sales}</td>
                          <td className="py-3">{item.conversionRate}</td>
                        </FramerTableRow>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </FramerDiv>
    </DashboardContentLayout>
  );
}
