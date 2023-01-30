import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SearchResult.module.css";

type SearchResultProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const showTipOnCopied = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1000);
  };

  return (
    <div className={styles["container"]} onMouseEnter={props.sendHoverLog}>
      <span className="flex">
        <div className={styles["url"]}>{props.url}</div>
        <div className={styles["copy-text-container"]}>
          <div className={visible ? "visible" : "invisible"}>
            <div className="tooltip tooltip-open tooltip-top" data-tip={t("base.copied")} />
          </div>
          <span
            className={styles["copy-text"]}
            onClick={() => {
              navigator.clipboard.writeText(props.url);
              showTipOnCopied();
            }}
          >
            {t("base.copy")}
          </span>
        </div>
      </span>
      <a href={props.url} target="_blank" rel="noreferrer" onClick={props.sendClickLog}>
        <div className={styles["title"]}>{props.title}</div>
      </a>
      <div className={styles["snippet"]}>{props.snippet.slice(0, 80) + "..."}</div>
    </div>
  );
};
