import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ControlUI } from "../../components/ControlUI";
import { IconUI } from "../../components/IconUI";
import { PurposeUI } from "../../components/PurposeUI";
import { RatioUI } from "../../components/RatioUI";
import { PhonySearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Serp/Pagination";
import { assignmentState } from "../../lib/store/assignment";
import { userState } from "../../lib/store/user";
import { getTaskInfo, sendClickLog, sendDwellTimeLog } from "../../lib/api";
import { getSearchPageFixture } from "./fixtures";
import useInterval from "./hooks/useInterval";
import { Assignment, TaskInfo, UserInfo } from "../../types";

type SearchResult = {
  id: number;
  title: string;
  url: string;
  snippet: string;
  icons?: string[];
  ratio?: {
    total: number;
    distribution: {
      category: string;
      count: number;
    }[];
  };
  attributes?: {
    name: string;
    value: string;
    exist: boolean;
  }[];
};

export const Search: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const getOffset = (queryParam: string | null) => {
    if (!queryParam) {
      return 0;
    }
    return parseInt(queryParam);
  };

  const [offset] = useState<number>(getOffset(params.get("offset")));
  const [isClickAnyResult, setClickAnyResult] = useState<boolean>(false);
  const [task, setTask] = useState<TaskInfo>();
  const [results, setResults] = useState<SearchResult[]>([]);

  const assignment = useRecoilValue<Assignment>(assignmentState);
  const user = useRecoilValue<UserInfo>(userState);

  useEffect(() => {
    document.title = "検索ページ";
    (async () => {
      const task = await getTaskInfo(assignment.taskId);
      setTask(task);
    })();
    const rs = getSearchPageFixture(assignment.taskId, offset + 1);
    setResults(rs);
    window.scroll(0, 0);
  }, [assignment.taskId, offset]);

  useInterval(
    () => sendDwellTimeLog(user.token, { user: user.id, task: assignment.taskId, condition: assignment.condition }),
    1000,
  );

  const sendClickLogHandler = (rank: number) => {
    sendClickLog(user.token, {
      user: user.id,
      task: assignment.taskId,
      condition: assignment.condition,
      rank: rank + 10 * offset,
      visible: rank % 2 === 1,
      isFirst: !isClickAnyResult,
    });
    setClickAnyResult(true);
  };

  return (
    <div className="App">
      <header className="h-20 fixed top-0 w-full block z-10 bg-white drop-shadow-md">
        <div className="mt-4 ml-40 w-[680px]">
          <PhonySearchBar query={task?.query || ""} warnMessage="検索クエリは変更できません" />
        </div>
      </header>

      <div className="relative mt-28 mb-32 ml-48 w-[650px]">
        {results?.map((page, idx) => {
          if (idx % 2 === 1) {
            return (
              <div key={`ctrl-${page.id}`} className="my-8">
                <ControlUI
                  title={page.title}
                  url={page.url}
                  snippet={page.snippet}
                  sendClickLog={() => sendClickLogHandler(idx + 1)}
                />
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
                    icons={page.icons}
                    sendClickLog={() => sendClickLogHandler(idx)}
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
                    ratio={page.ratio}
                    sendClickLog={() => sendClickLogHandler(idx)}
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
                    sendClickLog={() => sendClickLogHandler(idx)}
                  />
                </div>
              );
            default:
              return (
                <div key={`control-${page.id}`} className="my-5">
                  <ControlUI
                    title={page.title}
                    url={page.url}
                    snippet={page.snippet}
                    sendClickLog={() => sendClickLogHandler(idx)}
                  />
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
