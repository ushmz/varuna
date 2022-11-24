import { MarketingAttribute, PlofilingAttribute, SearviceAttribute } from "@components/Attributes";
import { SearchResult } from "@components/SearchResult";
import style from './PurposeUI.module.css';

type PurposeUIProps = {
  title: string;
  url: string;
  snippet: string;
  attributes: {
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
      {props.attributes && (
        <div className={style['nudge']}>
          <h4 className={style['nudge-title']} >
            上のウェブページでは、以下の目的であなたの情報を取得します。
          </h4>
          <div className={style['nudge-contents']}>
            <SearviceAttribute
              name={props.attributes[0].name}
              value={props.attributes[0].value}
              exist={props.attributes[0].exist}
            />
            <MarketingAttribute
              name={props.attributes[1].name}
              value={props.attributes[1].value}
              exist={props.attributes[1].exist}
            />
            <PlofilingAttribute
              name={props.attributes[2].name}
              value={props.attributes[2].value}
              exist={props.attributes[2].exist}
            />
          </div>
        </div>
      )}
    </div>
  );
};
