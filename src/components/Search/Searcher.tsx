import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import React, { ReactElement, useState } from "react";
const SearchModal = dynamic(() => import("./SearchModal"));

interface SearcherProps {
  customTrigger?: ReactElement;
}

const Searcher = ({ customTrigger }: SearcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSearch = () => {
    setIsOpen(!isOpen);
  };

  const DefaultTrigger = (
    <button
      className="flex items-center border border-blue-400 rounded-md px-3 py-2"
      onClick={handleOpenSearch}
    >
      <Search className="h-5 w-5 text-blue-400" />
    </button>
  );

  const TriggerComponent = customTrigger
    ? React.cloneElement(customTrigger, { onClick: handleOpenSearch })
    : DefaultTrigger;

  return (
    <>
      {TriggerComponent}
      {isOpen && (
        <SearchModal isOpen={isOpen} handleOpenSearch={handleOpenSearch} />
      )}
    </>
  );
};

export default Searcher;
