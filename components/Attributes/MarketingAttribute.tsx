import React from "react";

type Props = {
  name: string;
  value: string;
  exist: boolean;
  withTip: boolean;
};

export const MarketingAttribute: React.FC<Props> = (props) => {
  return props.withTip ? (
    <div className={`${props.exist ? "bg-red-400" : "bg-red-100"} rounded-full attr px-2 py-1`}>
      <div className="tooltip tooltip-top" data-tip={props.value}>
        <div className={`text-center ${props.exist ? "text-black" : "text-gray-400"}`}>{`${props.name}`}</div>
      </div>
    </div>
  ) : (
    <div className={`${props.exist ? "bg-red-400" : "bg-red-100"} rounded-full attr px-2 py-1`}>
      <div className={`text-center ${props.exist ? "text-black" : "text-gray-400"}`}>{`${props.name}`}</div>
    </div>
  );
};
