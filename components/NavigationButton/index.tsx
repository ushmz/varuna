import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  title: string;
  ready: boolean;
};

const NavigationButton: React.FC<Props> = (props) => {
  return (
    <Link href={props.href || "#"} as={props.href || "#"}>
      <button className={`btn btn-md gap-2 normal-case ${props.ready ? "btn-ghost" : "btn-disabled"}`}>
        <div className="flex flex-col items-end col-span-3">
          <span className="text-base-content/50 text-md font-normal block">次へ</span>
          <span className="text-lg">{props.title}</span>
        </div>
        <svg
          className="h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
    </Link>
  );
};

export default NavigationButton;
