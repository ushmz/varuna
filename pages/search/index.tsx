import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { PurposeUI } from "@components/PurposeUI";
import { PhonySearchBar } from "@components/SearchBar";
import { SerpPagination } from "@components/Serp/Pagination";
import type { SearchPage, SerpResponse } from "@pages/api/search";

type Props = {};

const Search: NextPage<Props> = () => {
  const [offset, setOffset] = useState<number>(0);
  const [pages, setPages] = useState<SearchPage[]>([]);

  useEffect(() => {
    axios
      .get<SerpResponse>(`/api/search`)
      .then((r) => r.data)
      .then((r) => setPages(r.data))
      .catch((e) => console.log(e));
    window.scrollTo(0, 0);
  }, [offset]);

  return (
    <div className="App">
      <header>
        <div className="h-20 fixed top-0 w-full block z-10 bg-white drop-shadow-md">
          <PhonySearchBar query="sample query" />
        </div>
      </header>

      <div className="relative mt-24 ml-48 w-[650px]">
        {pages.map((page) => {
          return (
            <div className="my-5">
              <PurposeUI
                title={page.title}
                url={page.url}
                snippet={page.snippet}
                attributes={page.attributes}
                sendClickLog={() => {}}
              />
            </div>
          );
        })}
        <SerpPagination maxPage={10} offset={offset} setOffset={setOffset} />
      </div>
    </div>
  );
};

export default Search;
