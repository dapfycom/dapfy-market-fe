import { useSearch } from "../SearchContext";

const NoResults = () => {
  const { setSearchTerm } = useSearch();
  return (
    <div className="flex flex-col w-full p-6">
      <h3 className="text-[hsla(0,0%,100%,.5)] uppercase mb-4 ">
        Popular searchs
      </h3>

      <div className="flex flex-wrap gap-2">
        <PopularSearch
          search="design"
          onClick={() => setSearchTerm("design")}
        />
        <PopularSearch
          search="templates"
          onClick={() => setSearchTerm("templates")}
        />
        <PopularSearch search="book" onClick={() => setSearchTerm("book")} />
        <PopularSearch
          search="prompt"
          onClick={() => setSearchTerm("prompt")}
        />
        <PopularSearch
          search="ecommerce template"
          onClick={() => setSearchTerm("ecommerce template")}
        />
      </div>
    </div>
  );
};

export default NoResults;

const PopularSearch = ({
  search,
  onClick,
}: {
  search: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="flex px-4 py-2 rounded-md bg-white/10 cursor-pointer text-sm"
      onClick={onClick}
    >
      <span>{search}</span>
    </button>
  );
};
