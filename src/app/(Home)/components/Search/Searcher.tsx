import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
const SearchModal = dynamic(() => import("./SearchModal"));

const Searcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSearch = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);

  return (
    <>
      <button
        className="flex items-center space-x-2 border border-blue-400 rounded-md px-3 py-2  pr-10"
        onClick={handleOpenSearch}
      >
        <Search className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-blue-800 ">Search...</span>
      </button>
      {isOpen && (
        <SearchModal isOpen={isOpen} handleOpenSearch={handleOpenSearch} />
      )}
    </>
  );
};

export default Searcher;
