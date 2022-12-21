import markdownStyle from "../../styles/markdown.module.css";
import StepCard from "../../components/StepCard";
import React, { useEffect, useState } from "react";
import NavigationButton from "../../components/NavigationButton";
import { useRecoilValue } from "recoil";
import { assignmentState } from "../../lib/store/assignment";
import { Assignment } from "../../lib/api/type";
import { useLocation } from "react-router-dom";

type TaskInfo = {
  id: string;
  query: string;
  title: string;
  description: string;
};

export const Task: React.FC = () => {
  const [isSERPClicked, setClicked] = useState<boolean>(false);
  const [answeredURL, setURL] = useState<string>("");
  const [answeredReason, setReason] = useState<string>("");
  const [task, setTask] = useState<TaskInfo>({ id: "", query: "", title: "", description: "" });

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  useEffect(() => {
    document.title = "検索タスク詳細";
    // getTask();
  }, []);

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
      <main>
        <div className="invisible md:visible md:mt-8">
          <StepCard step={2} />
        </div>
        <div className={markdownStyle["markdown"]}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <h2>注意事項</h2>
          <ul>
            <li>タスク中はブラウザーの「戻る」ボタンは使用しないでください。</li>
            <li>
              タスク中、ページ閲覧ログを収集させていただきます。収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
            </li>
            <li>「検索を始める」ボタンをクリックすると、新しいタブで検索結果リストが表示されます。</li>
            <li>
              今回のタスクでは検索キーワードは変更できません。表示された検索結果リストおよび、そのリンク先ページのみ閲覧してください。
            </li>
            <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
            <li>
              Google 検索や Yahoo
              検索など他のウェブ検索エンジンを使わずにタスクを行ってください。あくまで表示された検索結果リストとそのリンク先ページの情報のみをもとに、タスクを行ってください．
            </li>
          </ul>
          <p></p>
        </div>
        <div className="mt-8 text-center">
          <a target="_blank" rel="noreferrer" href={`/search/${task.id}?offset=0`}>
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
            <NavigationButton href="/enquete/post" ready={ready()} title="事後アンケート" />
          ) : (
            <div className="tooltip tooltip-warning" data-tip={wanrMsg()}>
              <NavigationButton href="/enquete/post" ready={ready()} title="事後アンケート" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
