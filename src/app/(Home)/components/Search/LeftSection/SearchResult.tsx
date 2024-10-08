import { routes } from "@/config/routes";
import Link from "next/link";
import { Fragment } from "react";
import { useSearch } from "../SearchContext";

const SearchResult = () => {
  const { searchResults, handleSelectProduct } = useSearch();
  console.log(searchResults);

  return (
    <div>
      {searchResults.map((product) => (
        <Fragment key={product.objectID}>
          <SearchResultItem
            key={product.objectID}
            product={product}
            onSelectProduct={handleSelectProduct}
          />
          <div className="h-[1px] w-full bg-gray-100/10" />
        </Fragment>
      ))}
    </div>
  );
};

export default SearchResult;

const SearchResultItem = ({
  product,
  onSelectProduct,
}: {
  product: any;
  onSelectProduct: (product: any) => void;
}) => {
  return (
    <Link
      href={`${routes.products}/${product.slug}`}
      target="_blank"
      onMouseEnter={() => onSelectProduct(product)}
    >
      <div className="p-5 text-gray-100/90 hover:bg-gray-100/10">
        <div className="flex flex-col gap-2">
          <h3>{product.title}</h3>
          <p className="text-sm line-clamp-1">{product.description}</p>
          <div className="text-xs text-gray-100/70">{product.category}</div>
        </div>
      </div>
    </Link>
  );
};
