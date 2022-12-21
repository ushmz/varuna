import React from "react";

type Props = {
  name: string;
  color?: string;
};

export const PrivacyAttribute: React.FC<Props> = (props) => {
  return (
    <div className="w-16 bg-blue-400 rounded-full">
      <div className="text-center">{props.name}</div>
    </div>
  );
};
