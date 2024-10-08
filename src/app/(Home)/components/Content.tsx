import { FramerDiv, FramerH2 } from "@/components/framer";
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

      {/* Grid of Products */}
      <Suspense fallback={"Loading..."}>
        <ProductsList category={category} search={search} />
      </Suspense>
    </FramerDiv>
  );
};

export default Content;
