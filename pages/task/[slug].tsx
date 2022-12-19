import Head from "next/head";
import { getTaskBySlug, getAllTaskPaths } from "@lib/api/content";
import markdownToHTML from "@lib/markdownToHTML";
import markdownStyle from "@styles/markdown.module.css";
import { NextPage } from "next";
import StepCard from "@components/StepCard";
import { useState } from "react";
import NavigationButton from "@components/NavigationButton";
import { useRecoilValue } from "recoil";
import { assignmentState } from "@lib/store/assignment";
import { Assignment } from "@lib/api/type";

type Props = {
  id: string;
  query?: string;
  title?: string;
  step: number;
  forward: {
    title: string;
    url: string;
  };
  content: string;
};

const Task: NextPage<Props> = (props) => {
  const [isSERPClicked, setClicked] = useState<boolean>(false);
  const [answeredURL, setURL] = useState<string>("");
  const [answeredReason, setReason] = useState<string>("");

  const assignment = useRecoilValue<Assignment>(assignmentState);

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
        <div className="invisible md:visible md:mt-8">
          <StepCard step={props.step} />
        </div>
        {props.title && (
          <div className={markdownStyle["markdown"]}>
            <h2>{props.title}</h2>
          </div>
        )}
        <div className={markdownStyle["markdown"]} dangerouslySetInnerHTML={{ __html: props.content }} />
        <div className="mt-8 text-center">
          <a target="_blank" rel="noreferrer" href={`/search/${props.id}?offset=0`}>
            <button className="btn btn-primary" onClick={() => setClicked(true)}>
              検索を始める
            </button>
          </a>
        </div>
        <div className="text-center">
          <div className="form-control">
            <label className="label">
              <span>サービスのURL（必須）</span>
            </label>
            <input
              type="text"
              placeholder="選択したウェブサービスのURLを入力"
              className="input input-bordered"
              value={answeredURL}
              onChange={(e) => setURL(e.target.value)}
            />
            <label className="label">
              <span>上記のURLを選択した理由</span>
            </label>
            <textarea
              placeholder="選択した理由を入力"
              className="textarea textarea-bordered h-24"
              value={answeredReason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-32 text-right">
          {ready() ? (
            <NavigationButton href={props.forward.url} ready={ready()} title={props.forward.title} />
          ) : (
            <div className="tooltip tooltip-warning" data-tip={wanrMsg()}>
              <NavigationButton href={props.forward.url} ready={ready()} title={props.forward.title} />
            </div>
          )}
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
  const task = getTaskBySlug(params.slug, ["id", "query", "title", "step", "forward", "content"]);

  const htmlContent = await markdownToHTML(task.content);
  return {
    props: {
      id: task.id,
      query: task.query,
      title: task.title,
      step: task.step,
      forward: task.forward,
      content: htmlContent,
    },
  };
}
