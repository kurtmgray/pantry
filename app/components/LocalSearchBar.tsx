import styles from "./SearchBar.module.css";

type Props = {
  searchArea: string;
  handleChange: (keyword: string) => void;
};

export default function LocalSearchBar({ searchArea, handleChange }: Props) {
  return (
    <div className={styles.searchBarContainer}>
      <input
        className={styles.searchBar}
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        placeholder={`Search ${searchArea}...`}
      />
      {/* {isLoading && <Spin className={styles.spinner} size="small" />} */}
    </div>
  );
}
