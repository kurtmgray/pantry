"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    searchKeyword !== "" && router.push(`/page?searchKeyword=${searchKeyword}`);
  }, [router, searchKeyword]);

  return (
    <div className="search-bar-container">
      <input
        className="dashboard__search-bar"
        type="text"
        value={searchKeyword}
        onChange={handleSearchChange}
        placeholder="Search recipes..."
      />
    </div>
  );
}
