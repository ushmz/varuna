import React, { useEffect, useState } from "react";
import { SearchBar } from "@components/Serp/SearchBar";
import { SearchResult } from "@components/Serp/SearchResult";
import { SerpPagination } from "@components/Serp/Pagination";
import { NextPage } from "next";
import { PrivacyAttribute } from "@components/Serp/PrivacyAttribute";

const props = {
  title: "Sample page title",
  url: "https://example.com/",
  snippet:
    "Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet Smaple snippet",
  suggestion: {
    title: "Sample suggestion title",
    child: <p>Sample suggestion element</p>,
  },
};

type Props = {};

const Search: NextPage<Props> = () => {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    // [TODO] Fetch search pages
    window.scrollTo(0, 0);
  }, [offset]);

  return (
    <div className="App">
      <header>
        <div style={styles.searchBarArea}>
          <SearchBar query="sample query" />
        </div>
      </header>

      <div style={styles.serpArea}>
        {[1, 2, 3].map((_, idx) => {
          return (
            <div key="srs-${idx}" style={{ marginTop: "20px", marginBottom: "10px" }}>
              <SearchResult
                key={idx}
                title={"Sample search result component with suggestion area"}
                url={props.url}
                snippet={props.snippet}
                sendClickLog={() => {
                  return;
                }}
              >
                <div className="suggestion-area">
                  <PrivacyAttribute name="Attribute" />
                </div>
              </SearchResult>
            </div>
          );
        })}

        {/* If nothing passed for `suggestion` prop, nothing appears as a suggestion component. */}
        {[1, 2, 3].map((_, idx) => {
          return (
            <SearchResult
              key={idx}
              title={"Sample search result component without suggestion area"}
              url={props.url}
              snippet={props.snippet}
              sendClickLog={() => {
                return;
              }}
            />
          );
        })}
        <SerpPagination maxPage={10} offset={offset} setOffset={setOffset} />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  searchBarArea: {
    background: "#ffffff",
    height: "69px",
    left: 0,
    position: "fixed",
    boxShadow: "0 1px 6px 0 rgb(32 33 36 / 28%)",
    top: "0px",
    overflow: "hidden",
    display: "block",
    width: "100%",
    minWidth: "1261px",
    zIndex: 3,
  },
  serpArea: {
    clear: "both",
    position: "relative",
    marginTop: "100px",
    marginLeft: "180px",
    width: "652px",
  },
};

export default Search;
