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

export const SerpPagination: React.FC<PaginationProps> = (props) => {
  return (
    <div style={{ display: "block" }}>
      <table style={styles.paginateTable}>
        <tbody>
          <tr style={styles.parentRow}>
            {Array.from({ length: props.maxPage }, (_, k) => k).map((v, idx) => {
              return (
                <a href={`/search?offset=${v}`}>
                  <td key={idx}>
                    <button style={v === props.offset ? styles.currentPageText : styles.pageText}>{v + 1}</button>
                  </td>
                </a>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  paginationItem: {
    border: "none",
    background: "transparent",
    // hover {
    //   background: "rgba(0, 0, 0, 0.2)";
    // },
  },
  paginateTable: {
    margin: "50px auto 50px",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  parentRow: {
    display: "table-row",
    // verticalAlign: "inherit",
    borderColor: "inherit",
  },
  currentPageText: {
    display: "block",
    color: "rgba(0,0,0,0.87)",
    fontWeight: "normal",
    fontSize: "18px",
    border: "none",
    background: "transparent",
    // hover {
    //   background: "rgba(0, 0, 0, 0.2)";
    // },
  },
  pageText: {
    display: "block",
    color: "#4285f4",
    fontWeight: "normal",
    fontSize: "18px",
    border: "none",
    background: "transparent",
    // hover {
    //   background: "rgba(0, 0, 0, 0.2)";
    // },
  },
  paginateItemImage: {
    cursor: "pointer",
    overflow: "hidden",
    height: "40px",
    width: "20px",
    display: "block",
  },
};
