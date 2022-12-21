import React from "react";
import styles from "./SearchResult.module.css";

type SearchResultProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <div className={styles.container} onMouseEnter={props.sendHoverLog}>
      <a href={props.url} target="_blank" rel="noreferrer" onClick={props.sendClickLog}>
        <div className={styles.url}>{props.url}</div>
        <h3 className={styles.title}>{props.title}</h3>
      </a>
      <div className={styles.snippet}>{props.snippet.slice(0, 80) + "..."}</div>
    </div>
  );
};
