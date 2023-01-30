import { useTranslation } from "react-i18next";
import { MarketingAttribute, PlofilingAttribute, SearviceAttribute } from "../../components/Attributes";
import { SearchResult } from "../../components/SearchResult";
import style from "./Purpose.module.css";

type PurposeUIProps = {
  title: string;
  url: string;
  snippet: string;
  attributes?: {
    name: string;
    value: string;
    exist: boolean;
  }[];
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const PurposeUI: React.FC<PurposeUIProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div onMouseEnter={props.sendHoverLog}>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div className={style["nudge"]}>
        <h4 className={style["nudge-title"]}>{t("purpose.description")}</h4>
        <div className={style["nudge-contents"]}>
          {props.attributes?.length || 0 > 0 ? (
            props.attributes?.map((a) => {
              if (!a.exist) {
                return;
              }
              switch (a.value) {
                case "service":
                  return <SearviceAttribute />;
                case "marketing":
                  return <MarketingAttribute />;
                case "profiling":
                  return <PlofilingAttribute />;
              }
            })
          ) : (
            <div className={"bg-gray-500 rounded-full attr px-2 py-1"}>
              <div className="text-center font-bold text-white">{t("purpose.unspecified")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
