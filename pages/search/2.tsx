import fs from "fs";
import React from "react";
import { NextPage } from "next";
import { ControlUI } from "@components/ControlUI";
import { IconUI } from "@components/IconUI";
import { PurposeUI } from "@components/PurposeUI";
import { RatioUI } from "@components/RatioUI";
import { PhonySearchBar } from "@components/SearchBar";
import { Pagination } from "@components/Serp/Pagination";
import type { SearchPage } from "@pages/api/search";
import { join } from "path";
import { useRecoilValue } from "recoil";
import { assignmentState } from "@lib/store/assignment";
import { Assignment } from "@lib/api/type";

type Props = {
  task: number;
  offset: number;
  pages: SearchPage[];
};

const Search: NextPage<Props> = (props) => {
  const assignment = useRecoilValue<Assignment>(assignmentState);

  return (
    <div className="App">
      <header className="h-20 fixed top-0 w-full block z-10 bg-white drop-shadow-md">
        <div className="mt-4 ml-40 w-[680px]">
          <PhonySearchBar query="家具レンタル" warnMessage="検索クエリは変更できません" />
        </div>
      </header>

      <div className="relative mt-28 mb-32 ml-48 w-[650px]">
        {props.pages.map((page, idx) => {
          if (idx % 2 === 1) {
            return (
              <div key={`ctrl-${page.id}`} className="my-8">
                <ControlUI title={page.title} url={page.url} snippet={page.snippet} sendClickLog={() => { }} />
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
                    linked={page.icons}
                    sendClickLog={() => { }}
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
                    linked={{ total: page.ratio.total, distribution: page.ratio.distribution }}
                    sendClickLog={() => { }}
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
                    sendClickLog={() => { }}
                  />
                </div>
              );
            default:
              return (
                <div key={`control-${page.id}`} className="my-5">
                  <ControlUI title={page.title} url={page.url} snippet={page.snippet} sendClickLog={() => { }} />
                </div>
              );
          }
        })}
        <div className="my-10">
          <Pagination maxPage={4} task={props.task} offset={props.offset} />
        </div>
      </div>
    </div>
  );
};

export default Search;

type SearchPageContext = {
  query: {
    offset?: number;
  };
};

export async function getServerSideProps({ query }: SearchPageContext) {
  const offset = query.offset ? query.offset : 0;

  const path = join(process.cwd(), "public/fixtures", `2_p${parseInt(offset) + 1}.json`);
  const content = fs.readFileSync(path, "utf8");
  const obj = JSON.parse(content);

  return {
    props: {
      task: 2,
      offset: query.offset || 0,
      pages: obj.data || [],
    },
  };
}
