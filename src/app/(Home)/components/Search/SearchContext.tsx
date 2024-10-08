import { useDebounce } from "@/hooks/useDebounce";
import productsService from "@/services/productsServices";
import React, { createContext, useCallback, useContext, useState } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: any[];
  isLoading: boolean;
  handleOpenSearch: (open: boolean) => void;
  selectedProduct: any;
  handleSelectProduct: (product: any) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<
  React.PropsWithChildren<{
    handleOpenSearch: (open: boolean) => void;
  }>
> = ({ children, handleOpenSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const performSearch = useCallback(async (term: string) => {
    if (!term) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await productsService.searchWithAlgolia(term);
      setSearchResults(results.hits);
      setSelectedProduct(results.hits[0]);
    } catch (error) {
      console.error("Error performing search:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);

  React.useEffect(() => {
    if (searchResults.length === 0) {
      setSelectedProduct(null);
    }
  }, [searchResults.length]);

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        isLoading,
        handleOpenSearch,
        selectedProduct,
        handleSelectProduct,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
