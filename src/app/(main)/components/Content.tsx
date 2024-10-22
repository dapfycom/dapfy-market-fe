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
    <div className="flex min-h-screen  flex-col h-full bg-blue-50 text-gray-800 w-full max-w-screen-md mx-auto px-md md:px-lg mt-[68px]">
      <Tabs defaultValue="trending">
        <FramerDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=""
        >
          <div className="sticky top-0 z-10 bg-blue-50 p-6 pb-2 overflow-hidden">
            <div className="max-w-screen-lg mx-auto w-full">
              <TabsList className="">
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                >
                  🔥 Trending
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                >
                  ✨ New Arrivals
                </TabsTrigger>
                <TabsTrigger
                  value="bestsellers"
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                >
                  🏆 Bestsellers
                </TabsTrigger>
                <TabsTrigger
                  value="for-you"
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                >
                  For you
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 pt-2">
            <div className="max-w-screen-lg mx-auto w-full">
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
                  Personalized recommendations based on your interests and
                  browsing history will appear here.
                </p>
              </TabsContent>
            </div>
          </div>
        </FramerDiv>
      </Tabs>
    </div>
  );
};

export default Content;
