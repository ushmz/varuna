import React from "react";
// import { PrivacyAttributeTip } from "./ToolTip";
import ReactToolTip from "react-tooltip";

type Props = {
  name: string;
  value: string;
  color: string;
};

export const PrivacyAttribute: React.FC<Props> = (props) => {
  return (
    <div className={`w-fit bg-[${props.color}] rounded-full attr`}>
      <div data-tip={props.value}>
        <div className="text-center">{`${props.name}: ${props.value}`}</div>
      </div>
      <ReactToolTip place="top" type="dark" />
    </div>
  );
};
