import React, { useEffect, useState } from "react";
import { SearchBar } from "@components/Serp/SearchBar";
import { SearchResult } from "@components/Serp/SearchResult";
import { SerpPagination } from "@components/Serp/Pagination";
import { NextPage } from "next";
import { PrivacyAttribute } from "@components/Attributes";
import { getSearchResults, SearchPage } from "@lib/api/external";

type Props = {};

const Search: NextPage<Props> = () => {
  const [offset, setOffset] = useState<number>(0);
  const [pages, setPages] = useState<SearchPage[]>([]);

  useEffect(() => {
    // [TODO] Fetch search pages
    getSearchResults(1, offset).then((r) => setPages(r));
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
        {pages.map((page, idx) => {
          return (
            <div key="srs-${idx}" style={{ marginTop: "20px", marginBottom: "10px" }}>
              <SearchResult
                key={idx}
                title={"Sample search result component with suggestion area"}
                url={page.url}
                snippet={page.snippet}
                sendClickLog={() => {
                  return;
                }}
              >
                <div className="suggestion-area">
                  <div className="flex flex-row gap-3">
                    {page.attributes.map((a) => (
                      <PrivacyAttribute name={a.name} value={a.value} color={a.color} />
                    ))}
                  </div>
                </div>
              </SearchResult>
            </div>
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
