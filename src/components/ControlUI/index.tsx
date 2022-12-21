import { SearchResult } from "../../components/SearchResult";

type ControlUIProps = {
  title: string;
  url: string;
  snippet: string;
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const ControlUI: React.FC<ControlUIProps> = (props) => {
  return (
    <div onMouseEnter={props.sendHoverLog}>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
    </div>
  );
};
