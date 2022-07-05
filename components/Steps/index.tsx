import { PanelSteps } from "./panel";
import { SimpleSteps } from "./simple";
import { CircularSteps } from "./circular";

type StepsProps = {
  valiant: "simple" | "circular";
  current: number;
  steps: string[];
};

const Steps = (props: StepsProps) => {
  switch (props.valiant) {
    // case "panel":
    //   return <PanelSteps current={props.current} steps={props.steps} />;
    case "circular":
      return <CircularSteps current={props.current} max={props.steps.length} />;
    default:
      return <SimpleSteps current={props.current} steps={props.steps} />;
  }
};

export default Steps;
