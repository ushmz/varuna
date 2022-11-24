import React from "react";
import ReactToolTip from "react-tooltip";

type Props = {
  name: string;
  value: string;
  exist: boolean;
};

export const PlofilingAttribute: React.FC<Props> = (props) => {
  return (
    <div className={`${props.exist ? "bg-yellow-400" : "bg-yellow-100"} rounded-full attr px-2 py-1`}>
      <div data-tip={props.value}>
        <div className={`text-center ${props.exist ? "text-black" : "text-gray-400"}`}>{`${props.name}`}</div>
      </div>
      <ReactToolTip place="top" type="dark" />
    </div>
  );
};
