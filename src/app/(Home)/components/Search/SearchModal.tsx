"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader, Search, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection";
import { SearchProvider, useSearch } from "./SearchContext";

const SearchInput = () => {
  const { searchTerm, setSearchTerm, handleOpenSearch, isLoading } =
    useSearch();

  return (
    <div className="flex items-center space-x-3 border bg-white rounded-md px-3 py-4 pr-10 w-1/2 relative">
      {isLoading ? (
        <Loader className="h-6 w-6 text-black animate-spin" />
      ) : (
        <Search className="h-6 w-6 text-black" />
      )}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a product..."
        className="border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent w-full"
      />
      <button
        className="flex flex-col items-center absolute right-[-90px] top-0 h-[58px] w-[58px] justify-center
                backdrop-filter backdrop-blur backdrop-brightness-100 backdrop-contrast-100 backdrop-grayscale-0 backdrop-hue-rotate-0 backdrop-invert-0 backdrop-opacity-100 backdrop-saturate-100 backdrop-sepia-0
                bg-white/20 rounded-lg
                shadow-[0_32px_40px_0_rgba(0,0,0,0.24),inset_0_1px_1px_0_hsla(0,0%,100%,0.25),inset_0_-1px_1px_0_hsla(0,0%,100%,0.1)]
                text-white hover:bg-white/30 transition-colors duration-200"
        onClick={() => handleOpenSearch(false)}
      >
        <X className="h-6 w-6" />
        <span className="text-[8px]">ESC</span>
      </button>
    </div>
  );
};

const SearchResults = () => {
  const { searchResults } = useSearch();

  return (
    <section
      className="flex  justify-center w-1/2 mt-6 
      backdrop-blur-[5px] bg-white/20 rounded-lg
      shadow-[0_32px_40px_0_rgba(0,0,0,0.24),inset_0_1px_1px_0_hsla(0,0%,100%,0.25),inset_0_-1px_1px_0_hsla(0,0%,100%,0.1)]
      text-white flex-1 max-h-[700px] min-h-[400px]"
    >
      <div className="grid grid-cols-2  w-full">
        <LeftSection />
        <RightSection />
      </div>
    </section>
  );
};

const SearchModalContent = () => {
  const { handleOpenSearch } = useSearch();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleOpenSearch(false);
      }
    },
    [handleOpenSearch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center  w-full  h-[95vh]">
      <SearchInput />
      <SearchResults />
    </div>
  );
};

const SearchModal = ({
  isOpen,
  handleOpenSearch,
}: {
  isOpen: boolean;
  handleOpenSearch: (open: boolean) => void;
}) => {
  return (
    <SearchProvider handleOpenSearch={handleOpenSearch}>
      <Dialog open={isOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-full  h-screen top-[0px] translate-y-[0]  bg-transparent border-none 
          shadow-none focus:outline-none 
          focus:ring-0 focus:ring-offset-0 
          focus:ring-transparent"
        >
          <SearchModalContent />
        </DialogContent>
      </Dialog>
    </SearchProvider>
  );
};

export default SearchModal;
