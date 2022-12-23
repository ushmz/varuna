import React from "react";

type Props = {
  name: string;
  value: string;
  exist: boolean;
  withTip?: boolean;
};

export const SearviceAttribute: React.FC<Props> = (props) => {
  if (!props.exist) {
    return <></>;
  }

  return props.withTip ? (
    <div className={"bg-blue-500 rounded-full attr px-2 py-1"}>
      <div className="tooltip tooltip-top" data-tip={props.value}>
        <div className="text-center font-bold text-white">サービスの提供・改善</div>
      </div>
    </div>
  ) : (
    <div className={"bg-blue-500 rounded-full attr px-2 py-1"}>
      <div className="text-center font-bold text-white">サービスの提供・改善</div>
    </div>
  );
};
