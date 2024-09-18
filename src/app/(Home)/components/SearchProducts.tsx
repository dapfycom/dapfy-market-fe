"use client";

import { FramerDiv } from "@/components/framer";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { fadeInUp } from "../constants";

const SearchProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const updateURL = useCallback(
    (value: string) => {
      if (value) {
        router.push(`?${createQueryString("search", value)}`, {
          scroll: false,
        });
      } else {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    },
    [router, createQueryString, searchParams]
  );

  useEffect(() => {
    updateURL(debouncedSearchValue);
  }, [debouncedSearchValue, updateURL]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <FramerDiv
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="mb-6"
    >
      <div className="relative">
        <Input
          placeholder="Search"
          className="pl-8 bg-white border-blue-200 text-gray-800"
          value={searchValue}
          onChange={handleSearch}
        />
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </FramerDiv>
  );
};

export default SearchProducts;
