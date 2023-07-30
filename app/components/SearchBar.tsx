"use client";
import useSearch from "@/lib/useSearch";
import styles from "./SearchBar.module.css";
import { useGlobalState } from "@/app/providers";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Spin } from "antd";

export default function SearchBar() {
  const { startSearch, isLoading } = useSearch();
  const { setState } = useGlobalState();
  const pathname = usePathname();

  useEffect(() => {
    setState((state: GlobalState) => ({ ...state, searchKeyword: "" }));
  }, [pathname, setState]);

  const handleSearchChange = (keyword: string) => {
    startSearch(keyword);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={styles.searchBar}
        type="text"
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search recipes..."
      />
      {
        isLoading && <Spin className={styles.spinner} size="small" />
        // <span className={styles.spinner}></span>
      }
    </div>
  );
}
