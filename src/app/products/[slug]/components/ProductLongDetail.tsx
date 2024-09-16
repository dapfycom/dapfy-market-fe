import { FramerDiv } from "@/components/framer";

const ProductLongDetail = () => {
  return (
    <FramerDiv
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="px-8 py-6 bg-blue-100"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        <span className="mr-2" role="img" aria-label="target">
          🎯
        </span>
        Product Details
      </h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>50+ customizable productivity templates</li>
        <li>10-step guide to effective time management</li>
        <li>Task prioritization software (1-year license)</li>
        <li>Access to exclusive productivity webinars</li>
        <li>Monthly newsletter with productivity tips</li>
      </ul>
    </FramerDiv>
  );
};

export default ProductLongDetail;
