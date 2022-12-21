import React from "react";

type Props = {
  content: string;
};

export const PrivacyAttributeTip: React.FC<Props> = (props) => {
  return (
    <div className="relative py-2 bg-white-800">
      <div className="container relative px-2 py-2 bg-white rounded w-fit">
        <p className="pt-2 pb-2 text-xs leading-none text-gray-600 ">{props.content}</p>
        <svg
          className="absolute z-2  bottom-[-10px] "
          width={16}
          height={10}
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};
