import { FramerDiv } from "@/components/framer";
import ReactMarkdown from "react-markdown";
const ProductLongDetail = ({
  longDescription,
}: {
  longDescription: string;
}) => {
  return (
    <FramerDiv
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        <span className="mr-2" role="img" aria-label="target">
          🎯
        </span>
        Product Details
      </h2>
      <div className="product-long-detail">
        <ReactMarkdown>{longDescription}</ReactMarkdown>
      </div>
    </FramerDiv>
  );
};

export default ProductLongDetail;
