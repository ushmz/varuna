import React from "react";

type PaginationProps = {
  maxPage: number;
  offset: number;
};

export const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <div className="btn-group">
      {Array.from({ length: props.maxPage }, (_, k) => k).map((v) => {
        return (
          <a
            key={`go-to-offset-${v}`}
            href={`/search?offset=${v}`}
            className={v == props.offset ? "btn btn-active" : "btn btn-ghost"}
          >
            {v + 1}
          </a>
        );
      })}
    </div>
  );
};
