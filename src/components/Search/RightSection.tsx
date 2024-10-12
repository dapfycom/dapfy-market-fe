import Image from "next/image";
import Link from "next/link";
import { useSearch } from "./SearchContext";

const RightSection = () => {
  const { selectedProduct, handleOpenSearch } = useSearch();

  if (!selectedProduct) return null;

  return (
    <div className="flex flex-col w-full border-l border-gray-200/15 p-6 text-center">
      {selectedProduct.images[0] && (
        <div className="w-full flex items-center justify-center mb-6">
          <Image
            src={selectedProduct.images[0]}
            alt={selectedProduct.title}
            width={100}
            height={100}
          />
        </div>
      )}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold mb-3">{selectedProduct.title}</h3>
        <p className="text-sm text-gray-300 mb-3">
          {selectedProduct.description}
        </p>
        <Link
          href={`?category=${selectedProduct.category}`}
          className="mb-6 px-4 py-1 border border-gray-200/15 rounded-full w-fit hover:border-gray-200/30 hover:bg-gray-200/10"
          onClick={() => handleOpenSearch(false)}
        >
          <span className="">{selectedProduct.category}</span>
        </Link>
        <div className="flex items-center justify-center ">
          <span className="text-xl font-bold">${selectedProduct.price}</span>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
