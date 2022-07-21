import React from "react";
import styles from "@styles/components/search-result.module.css";

type SearchResultProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
  children?: React.ReactNode;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <a href={props.url} target="_blank" rel="noreferrer" className={styles.link} onClick={props.sendClickLog}>
          <br />
          <h3 className={styles.title}>{props.title}</h3>
          <div className={styles.urlposition}>
            <cite className={styles.url}>
              {props.url}
              <span></span>
            </cite>
          </div>
        </a>
      </div>
      <div className={styles.snippet}>{props.snippet.slice(0, 80) + "..."}</div>
      {props.children && <div className={styles.suggest}>{props.children}</div>}
    </div>
  );
};
