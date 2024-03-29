import React from "react";
import { useTranslation } from "react-i18next";

import { SearchResult } from "../SearchResult";
import style from "./Icon.module.css";

type IconUIProps = {
  title: string;
  url: string;
  snippet: string;
  icons?: string[];
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

// const getIconCache = (origin: string): string => {
//   const prsr = new URL(origin);
//   return `/img/icons/${prsr.hostname}.png`;
// };

export const IconUI: React.FC<IconUIProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div onMouseEnter={props.sendHoverLog}>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div className={style["nudge"]}>
        <h4 className={style["suggestion-title"]}>
          {t("icon.description_line1")}
          <br />
          {t("icon.description_line2")}
        </h4>
        <div className={style["icons-container"]}>
          {props.icons?.map((src, idx) => (
            <div key={`${src}.${idx}`}>
              <img
                src={src}
                className={style["icon"]}
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                  // const leaksArea = document.getElementById('eob_21');
                  // if (leaksArea != null) {
                  //   leaksArea.style.display = 'none';
                  // }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
