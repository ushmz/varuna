import React, { useState } from "react";
import styles from "@styles/components/search-bar.module.css";

type SearchHeaderProps = {
  query: string;
};

export const SearchBar: React.FC<SearchHeaderProps> = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className={styles.container}>
      <form action="/" method="GET">
        <div style={{ display: "flex" }}>
          <div className={styles.queryinputposition}>
            <input className={styles.bar} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="button" className={styles.queryinput} aria-label="検索" onClick={() => setQuery("")}>
              <div className={styles.cleaniconposition}>
                <span className={styles.iconappearance}>
                  <svg
                    className={styles.clear}
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d={CROSS_SVG_PATH}></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
          <div className={styles.divider} />

          <button type="submit" className={styles.queryinput} aria-label="検索">
            <div className={styles.submiticonposition}>
              <span className={styles.iconappearance}>
                <svg className={styles.search} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d={SEARCH_SVG_PATH}></path>
                </svg>
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

const CROSS_SVG_PATH = `
M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 
17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z
`;

const SEARCH_SVG_PATH = `
M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 
9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 
4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 
0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 
9.5 11.99 14 9.5 14z
`;
