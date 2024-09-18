import { FramerDiv, FramerH2, FramerP } from "@/components/framer";
import { Suspense } from "react";
import { fadeInUp, staggerChildren } from "../constants";
import ProductsList from "./ProductsList";
import SearchProducts from "./SearchProducts";
import SigUpButton from "./SigUpButton";

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
          className="space-y-2"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <FramerH2
            variants={fadeInUp}
            className="text-3xl font-semibold text-blue-800"
          >
            Monetise your idea.
          </FramerH2>
          <FramerP variants={fadeInUp} className="text-xl text-gray-600">
            Buy and sell anything digital.
          </FramerP>
          <FramerP variants={fadeInUp} className="text-sm text-green-600">
            Get started with Dapfy.com — Risk free, No Credit Card Required
          </FramerP>
          <SigUpButton />
        </FramerDiv>
        {/* <FramerDiv
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-64 h-48 bg-white rounded-lg shadow p-4"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </FramerDiv> */}
      </div>
      <SearchProducts />
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
