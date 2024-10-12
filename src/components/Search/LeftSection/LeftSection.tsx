import { useSearch } from "../SearchContext";
import NoResults from "./NoResults";
import SearchResult from "./SearchResult";

const LeftSection = () => {
  const { searchResults } = useSearch();
  return (
    <div>{searchResults.length > 0 ? <SearchResult /> : <NoResults />}</div>
  );
};

export default LeftSection;
