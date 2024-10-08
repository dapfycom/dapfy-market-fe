import { FramerDiv, FramerH2 } from "@/components/framer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { fadeInUp } from "../constants";
import ProductsList from "./ProductsList";
import Chart from "./chart";
const Content = ({
  category,
  search,
}: {
  category: string;
  search?: string;
}) => {
  return (
    <FramerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 bg-blue-50 text-gray-800 flex-1 overflow-auto"
    >
      <div className="mb-6 flex justify-between items-start">
        <FramerDiv
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-64 h-48 bg-white rounded-lg shadow p-4"
        >
          <Chart />
        </FramerDiv>
      </div>
      {/* <SearchProducts /> */}
      <FramerH2
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-2xl font-semibold text-blue-800 mb-4 text-center"
      >
        Trending Now
      </FramerH2>

      <Tabs defaultValue="trending" className="mb-6">
        <TabsList>
          <TabsTrigger value="trending">🔥 Trending</TabsTrigger>
          <TabsTrigger value="new">✨ New Arrivals</TabsTrigger>
          <TabsTrigger value="bestsellers">🏆 Bestsellers</TabsTrigger>
          <TabsTrigger value="for-you" className="bg-red-100 text-red-600">
            For you
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trending">
          <Suspense fallback={"Loading..."}>
            <ProductsList category={category} search={search} />
          </Suspense>
        </TabsContent>
        <TabsContent value="new">
          <p>
            New arrivals coming soon! Stay tuned for our latest digital
            products.
          </p>
        </TabsContent>
        <TabsContent value="bestsellers">
          <p>
            Our top-selling products will be featured here. Check back for
            updates!
          </p>
        </TabsContent>
        <TabsContent value="for-you">
          <p>
            Personalized recommendations based on your interests and browsing
            history will appear here.
          </p>
        </TabsContent>
      </Tabs>

      {/* Grid of Products */}
    </FramerDiv>
  );
};

export default Content;
