import Head from "next/head";
import { getTaskBySlug, getAllTaskPaths } from "@lib/api/content";
import markdownToHTML from "@lib/markdownToHTML";
import markdownStyle from "@styles/markdown.module.css";
import { NextPage } from "next";
import StepCard from "@components/StepCard";
import { useState } from "react";
import NavigationButton from "@components/NavigationButton";

type Props = {
  id: string;
  query?: string;
  title?: string;
  step: number;
  nextPath: string;
  content: string;
};

const Task: NextPage<Props> = (props) => {
  const [isSERPClicked, setClicked] = useState<boolean>(false);
  const [answeredURL, setURL] = useState<string>("");
  const [answeredReason, setReason] = useState<string>("");

  const ready = () => {
    return isSERPClicked && /^https?:\/\/.+/.test(answeredURL);
  };

  const wanrMsg = () => {
    if (!isSERPClicked) {
      return "検索を開始してください";
    } else if (answeredURL.length < 1) {
      return "回答を入力してください";
    } else if (!/^https?:\/\/.+/.test(answeredURL)) {
      return "有効なURLを入力してください";
    }
    return "";
  };

  return (
    <div>
      <Head>
        <title>タスク詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="md:grid md:grid-cols-3">
          <div className="invisible md:visible md:mt-16 md:col-span-1">
            <StepCard step={props.step} />
          </div>
          <div className="md:col-span-2">
            {props.title && (
              <div className={markdownStyle["markdown"]}>
                <h2>{props.title}</h2>
              </div>
            )}
            <div className={markdownStyle["markdown"]} dangerouslySetInnerHTML={{ __html: props.content }} />
            <div>
              <button className="btn btn-primary" onClick={() => setClicked(true)}>
                検索を始める
              </button>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span>サービスのURL（必須）</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value={answeredURL}
                onChange={(e) => setURL(e.target.value)}
              />
              <label className="label">
                <span>理由</span>
              </label>
              <textarea
                placeholder=""
                className="textarea textarea-bordered h-24 w-full max-w-xs"
                value={answeredReason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="mt-32 text-right">
              {ready() ? (
                <NavigationButton href={props.nextPath} ready={ready()} title="事後アンケート" />
              ) : (
                <div className="tooltip tooltip-warning" data-tip={wanrMsg()}>
                  <NavigationButton href={props.nextPath} ready={ready()} title="事後アンケート" />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Task;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticPaths() {
  const tasks = getAllTaskPaths();
  return {
    paths: tasks,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const task = getTaskBySlug(params.slug, ["id", "query", "title", "step", "nextPath", "content"]);

  const htmlContent = await markdownToHTML(task.content);
  return {
    props: {
      id: task.id,
      query: task.query,
      title: task.title,
      step: task.step,
      nextPath: task.nextPath,
      content: htmlContent,
    },
  };
}
