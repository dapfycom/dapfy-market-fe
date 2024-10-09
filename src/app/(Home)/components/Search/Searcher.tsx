import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
const SearchModal = dynamic(() => import("./SearchModal"));

const Searcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="flex items-center border border-blue-400 rounded-md px-3 py-2 "
        onClick={handleOpenSearch}
      >
        <Search className="h-5 w-5 text-blue-400" />
      </button>
      {isOpen && (
        <SearchModal isOpen={isOpen} handleOpenSearch={handleOpenSearch} />
      )}
    </>
  );
};

export default Searcher;
