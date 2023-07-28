"use client";
import useSearch from "@/lib/useSearch";
import Spinner from "@/app/components/Spinner";
// import spinnerStyles from "@/app/components/Spinner.module.css";

export default function SearchBar() {
  const { startSearch } = useSearch();

  const handleSearchChange = (keyword: string) => {
    startSearch(keyword);
  };

  return (
    <div className="search-bar-container">
      <input
        className="dashboard__search-bar"
        type="text"
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search recipes..."
      />
      {/* {isPending && (
        <div
          className={"dashboard__search-bar" + " " + isPending ? "loading" : ""}
        >
          <Spinner />
        </div>
      )} */}
    </div>
  );
}
