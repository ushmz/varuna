import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import markdownStyle from "../../styles/markdown.module.css";
import StepCard from "../../components/StepCard";
import NavigationButton from "../../components/NavigationButton";
import { assignmentState } from "../../lib/store/assignment";
import { Assignment, TaskInfo, UserInfo } from "../../types";
import { createAnswer, getTaskInfo } from "../../lib/api";
import { userState } from "../../lib/store/user";
import { Error } from "../Error";

const URL_PATTERN = /^https?:\/\/.+\..+/;

export const Task: React.FC = () => {
  const [isSERPClicked, setClicked] = useState<boolean>(false);
  const [isValidURL, setIsValidURL] = useState<boolean>(false);
  const [answeredURL, setURL] = useState<string>("");
  const [answeredReason, setReason] = useState<string>("");
  const [task, setTask] = useState<TaskInfo>();
  const [submissionLocked, setSubmissionLocked] = useState<boolean>(false);

  const assignment = useRecoilValue<Assignment>(assignmentState);
  const user = useRecoilValue<UserInfo>(userState);

  useEffect(() => {
    document.title = "検索タスク詳細";
    (async () => {
      const task = await getTaskInfo(assignment.taskId);
      setTask(task);
    })();
  }, [assignment.taskId]);

  useEffect(() => {
    setIsValidURL(URL_PATTERN.test(answeredURL));
  }, [answeredURL]);

  useEffect(() => {
    isSERPClicked && isValidURL
      ? (window.onbeforeunload = null)
      : (window.onbeforeunload = function (e) {
          e.preventDefault();
          e.returnValue = "このページを離れると、タスクを再開することはできません。このページを離れますか？";
          return "このページを離れると、タスクを再開することはできません。このページを離れますか？";
        });
  }, [isSERPClicked, isValidURL]);

  const wanrMsg = () => {
    if (!isSERPClicked) {
      return "検索を開始してください";
    } else if (answeredURL.length < 1) {
      return "回答を入力してください";
    } else if (!URL_PATTERN.test(answeredURL)) {
      return "有効なURLを入力してください";
    }
    return "";
  };

  const onSubmitAnswer = async () => {
    window.onbeforeunload = null;
    console.log(window.onbeforeunload);
    if (!submissionLocked) {
      setSubmissionLocked(true);
      await createAnswer(user.token, {
        userId: user.id,
        taskId: assignment.taskId,
        condition: assignment.condition,
        answer: answeredURL,
        reason: answeredReason,
      });
      setSubmissionLocked(false);
    }
  };

  if (!task) {
    return <></>;
  }

  if (!assignment.taskId || !assignment.condition) {
    return <Error />;
  }

  return (
    <div>
      <main>
        <div className="invisible md:visible md:mt-8">
          <StepCard step={2} />
        </div>
        <div className={markdownStyle["markdown"]}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <ul>
            <li>このページにある「検索を始める」ボタンをクリックし、検索を開始してください。</li>
            <li>
              表示された検索結果のリストを参考にして、実際に利用したい{task.topic}サービスを<strong>1つ</strong>
              決定してください。
            </li>
            <li>
              利用したいサービスが決まったらウェブ検索を終了し、 このページの末尾にある解答欄に選択した
              <strong>ウェブサービスのURL</strong>と、そのサービスを選んだ
              <strong>理由</strong>を入力してください。
            </li>
          </ul>
          <h2>注意事項</h2>
          <ul>
            <li>「検索を始める」ボタンをクリックすると、新しいタブで検索結果リストが表示されます。</li>
            <li>今回のタスクでは検索キーワードは変更できません。</li>
            <li>
              Google検索やYahoo検索など他のウェブ検索エンジンを使わずにタスクを行ってください。あくまで表示された検索結果リストとそのリンク先ページの情報のみをもとに、タスクを行ってください。
            </li>
            <li>制限時間はありませんので、納得のいくまで検索を行ってください。</li>
            <li>
              ウェブ検索が終了したら、検索結果リストは<strong>閉じて</strong>ください。
            </li>
            <li>回答の入力が完了したら、「次へ」のボタンから事後アンケートに進んでください。</li>
            <li>
              検索タスク中のページ閲覧ログを収集させていただきます。収集したログはすべて匿名化され、学術研究目的にのみ利用されます。
            </li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <a target="_blank" rel="noreferrer" href={`/search?offset=0`}>
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
          {isSERPClicked && isValidURL ? (
            <div
              onClick={() => {
                window.onbeforeunload = null;
                onSubmitAnswer();
              }}
            >
              <NavigationButton ready href="/enquete/post" title="事後アンケート" />
            </div>
          ) : (
            <div className="tooltip tooltip-warning" data-tip={wanrMsg()}>
              <NavigationButton ready={false} href="" title="事後アンケート" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
