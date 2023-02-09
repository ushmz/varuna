import React from "react";
import { useTranslation } from "react-i18next";

import { SearchResult } from "../SearchResult";
import style from "./Ratio.module.css";

type LinkedPageDistribution = {
  total: number;
  distribution: { category: string; count: number }[];
};

type RatioUIProps = {
  title: string;
  url: string;
  snippet: string;
  ratio?: LinkedPageDistribution;
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const RatioUI: React.FC<RatioUIProps> = (props) => {
  const { t } = useTranslation();
  const total = props.ratio?.total || 0;
  return (
    <div onMouseEnter={props.sendHoverLog}>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div className={style["nudge"]}>
        <h4 className={style["suggestion-title"]}>
          {t("ratio.description_line1")}
          <br />
          {`${t("ratio.description_line2")}（${total} ${t("ratio.count")}）`}
        </h4>
        <div className={"flex"}>
          {props.ratio &&
            props.ratio.distribution.map((v, idx) => {
              const count = Math.ceil((v.count / total) * 1000) / 10;
              return (
                <div key={idx} className={style["ratio-column"]}>
                  <div className={style["ratio-category"]}>{v.category}</div>
                  <div className={style["ratio"]}>{`${count}%（${v.count} ${t("ratio.count")}）`}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
