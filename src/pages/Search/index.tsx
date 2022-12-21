import React, { useEffect, useState } from "react";
import { ControlUI } from "../../components/ControlUI";
import { IconUI } from "../../components/IconUI";
import { PurposeUI } from "../../components/PurposeUI";
import { RatioUI } from "../../components/RatioUI";
import { PhonySearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Serp/Pagination";
import { useRecoilValue } from "recoil";
import { assignmentState } from "../../lib/store/assignment";
import { Assignment } from "../../lib/api/type";
import { useLocation } from "react-router-dom";

type Props = {
  query: string;
  pages: {
    id: number;
    title: string;
    url: string;
    snippet: string;
    attributes: any[];
  }[];
};

export const Search: React.FC = () => {
  const [results, setResults] = useState<Props>();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const getOffset = (queryParam: string | null) => {
    if (!queryParam) {
      return 0;
    }
    return parseInt(queryParam);
  };

  const assignment = useRecoilValue<Assignment>(assignmentState);

  useEffect(() => {
    document.title = "検索ページ";
    // getSearchResult();
  }, []);

  return (
    <div className="App">
      <header className="h-20 fixed top-0 w-full block z-10 bg-white drop-shadow-md">
        <div className="mt-4 ml-40 w-[680px]">
          <PhonySearchBar query="sample query" warnMessage="検索クエリは変更できません" />
        </div>
      </header>

      <div className="relative mt-28 mb-32 ml-48 w-[650px]">
        {results?.pages.map((page, idx) => {
          if (idx % 2 === 1) {
            return (
              <div key={`ctrl-${page.id}`} className="my-8">
                <ControlUI title={page.title} url={page.url} snippet={page.snippet} sendClickLog={() => {}} />
              </div>
            );
          }
          switch (assignment.condition) {
            case "icon":
              return (
                <div key={`icon-${page.id}`} className="my-8">
                  <IconUI
                    title={page.title}
                    url={page.url}
                    snippet={page.snippet}
                    linked={[]}
                    sendClickLog={() => {}}
                  />
                </div>
              );
            case "ratio":
              return (
                <div key={`ratio-${page.id}`} className="my-5">
                  <RatioUI
                    title={page.title}
                    url={page.url}
                    snippet={page.snippet}
                    linked={{ total: 0, distribution: [] }}
                    sendClickLog={() => {}}
                  />
                </div>
              );
            case "purpose":
              return (
                <div key={`purpose-${page.id}`} className="my-5">
                  <PurposeUI
                    title={page.title}
                    url={page.url}
                    snippet={page.snippet}
                    attributes={page.attributes}
                    sendClickLog={() => {}}
                  />
                </div>
              );
            default:
              return (
                <div key={`control-${page.id}`} className="my-5">
                  <ControlUI title={page.title} url={page.url} snippet={page.snippet} sendClickLog={() => {}} />
                </div>
              );
          }
        })}
        <div className="my-10">
          <Pagination maxPage={4} offset={getOffset(params.get("offset"))} />
        </div>
      </div>
    </div>
  );
};
