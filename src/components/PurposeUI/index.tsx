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
  return (
    <div onMouseEnter={props.sendHoverLog}>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div className={style["nudge"]}>
        <h4 className={style["nudge-title"]}>上のウェブページでは、以下の目的であなたの情報を取得します。</h4>
        <div className={style["nudge-contents"]}>
          {props.attributes?.length || 0 > 0 ? (
            props.attributes?.map((a) => {
              if (!a.exist) {
                return;
              }
              switch (a.value) {
                case "service":
                  return <SearviceAttribute name={a.name} value={a.value} exist={a.exist} />;
                case "marketing":
                  return <MarketingAttribute name={a.name} value={a.value} exist={a.exist} />;
                case "profiling":
                  return <PlofilingAttribute name={a.name} value={a.value} exist={a.exist} />;
              }
            })
          ) : (
            <div className={"bg-gray-500 rounded-full attr px-2 py-1"}>
              <div className="text-center font-bold text-white">記載なし</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};