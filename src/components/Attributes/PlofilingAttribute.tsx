import React from "react";

type Props = {
  name: string;
  value: string;
  exist: boolean;
  withTip?: boolean;
};

export const PlofilingAttribute: React.FC<Props> = (props) => {
  if (!props.exist) {
    return <></>;
  }

  return props.withTip ? (
    <div className="bg-green-500 rounded-full attr px-2 py-1">
      <div className="tooltip tooltip-top" data-tip={props.value}>
        <div className="text-center font-bold text-white">顧客分析</div>
      </div>
    </div>
  ) : (
    <div className="bg-green-500 rounded-full attr px-2 py-1">
      <div className="text-center font-bold text-white">顧客分析</div>
    </div>
  );
};
