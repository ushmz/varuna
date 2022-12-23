import React, { useState } from "react";
import styles from "./SearchResult.module.css";
import { Clipboard } from "react-feather";

type SearchResultProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const showTipOnCopied = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1000);
  };

  return (
    <div className={styles.container} onMouseEnter={props.sendHoverLog}>
      <div className={visible ? "visible" : "invisible"}>
        <div className="tooltip tooltip-open tooltip-top" data-tip="URLをコピーしました" />
      </div>
      <span className="flex">
        <button
          className={styles.copybtn}
          onClick={() => {
            navigator.clipboard.writeText(props.url);
            showTipOnCopied();
          }}
        >
          <Clipboard className="h-5" />
        </button>
        <div className={styles.url}>{props.url}</div>
      </span>
      <a href={props.url} target="_blank" rel="noreferrer" onClick={props.sendClickLog}>
        <h3 className={styles.title}>{props.title}</h3>
      </a>
      <div className={styles.snippet}>{props.snippet.slice(0, 80) + "..."}</div>
    </div>
  );
};
