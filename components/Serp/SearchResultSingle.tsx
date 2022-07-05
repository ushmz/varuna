import React from "react";

type SearchResultSingleProps = {
  title: string;
  url: string;
  snippet: string;
  onResultClick?: () => void;
  suggestion?: {
    title: string;
    child: JSX.Element;
    onClick?: () => void;
  };
};

export const SearchResultSingle: React.FC<SearchResultSingleProps> = (props) => {
  return (
    <div style={styles.container} className="g">
      <div style={styles.pageInfo}>
        <a style={styles.pageInfoLink} href={props.url} target="_blank" rel="noreferrer" onClick={props.onResultClick}>
          <br />
          <h3 style={styles.pageTitle}>{props.title}</h3>
          <div style={styles.pageUrlPosition}>
            <cite style={styles.pageUrlCite}>
              {props.url}
              <span></span>
            </cite>
          </div>
        </a>
      </div>
      <div style={styles.pageInfoSnippet}>{props.snippet}</div>
      {props.suggestion && (
        <div style={styles.pageInfoSuggestion}>
          <h4 style={styles.suggestionTitle}>{props.suggestion.title}</h4>
          <div style={styles.suggestionComponent} onClick={props.suggestion.onClick}>
            {props.suggestion.child}
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageTitle: {
    fontSize: "20px",
    lineHeight: 1.3,
    fontWeight: "normal",
    margin: 0,
    padding: 0,
  },
  pageUrlPosition: {
    position: "absolute",
    left: 0,
    top: 0,
    display: "inline-block",
    paddingBottom: "2px",
    paddingTop: "1px",
    WebkitTextSizeAdjust: "none",
  },
  pageUrlCite: {
    paddingTop: "1px",
    fontSize: "14px",
    lineHeight: 1.3,
    color: "#202124",
    fontStyle: "normal",
  },
  suggestionTitle: {
    marginBottom: "4px",
    marginLeft: 0,
    marginTop: "14px",
    color: "rgba(0, 0, 0, 0.57)",
    margin: "12px 0px",
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: 1.2,
  },
  suggestionComponent: {
    maxHeight: "72px",
    whiteSpace: "nowrap",
    lineHeight: "24px",
    marginLeft: 0,
    overflowX: "hidden",
    paddingLeft: 0,
    paddingRight: 0,
    width: "calc(100% - 24px)",
    display: "inline-block",
    overflowY: "hidden",
  },
  container: {
    width: "600px",
    marginTop: 0,
    marginBottom: "30px",
    lineHeight: 1.6,
    textAlign: "left",
    fontFamily: "arial, sans-serif",
    fontSize: "14px",
    position: "relative",
  },
  pageInfo: {
    fontWeight: "normal",
    fontSize: "small",
    lineHeight: 1.58,
  },
  pageInfoLink: {
    color: "#1a0dab",
    textDecoration: "none",
    // -webkit-tap-highlight-color: "rgba(0, 0, 0, 0.1)";
    backgroundColor: "transparent",
  },
  pageInfoSnippet: {
    maxWidth: "48em",
    color: "#4d5156",
    lineHeight: 1.58,
    display: "block",
  },
  pageInfoSuggestion: {
    display: "block",
    opacity: 1,
    boxShadow: "none",
    marginTop: "8px",
    border: "1px solid #dadce0",
    borderRadius: "8px",
    outline: "none",
    position: "relative",
    top: "2px",
    transition: "all 150ms ease-in-out",
    whiteSpace: "nowrap",
    paddingLeft: "15px",
    backgroundColor: "transparent",
    transformOrigin: "top",
  },
};
