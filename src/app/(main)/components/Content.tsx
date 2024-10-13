import { FramerDiv } from "@/components/framer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import ProductsList from "./ProductsList";
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
      className="p-6 bg-blue-50 text-gray-800 flex-1 overflow-auto w-full"
    >
      <div className="max-w-screen-lg mx-auto w-full ">
        <Tabs defaultValue="trending" className="mb-6">
          <TabsList className="mb-8">
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
      </div>

      {/* Grid of Products */}
    </FramerDiv>
  );
};

export default Content;
