import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import markdownStyle from "../../styles/markdown.module.css";
import StepCard from "../../components/StepCard";
import NavigationButton from "../../components/NavigationButton";
import { Assignment, UserInfo } from "../../types";
import { assignmentState } from "../../lib/store/assignment";
import { userState } from "../../lib/store/user";
import { enquete } from "../../lib/config";

export const PostEnquete: React.FC = () => {
  const [isEnqueteClicked, setClicked] = useState<boolean>(false);

  const user = useRecoilValue<UserInfo>(userState);
  const assignment = useRecoilValue<Assignment>(assignmentState);

  useEffect(() => {
    window.onbeforeunload = function (e) {
      e.preventDefault();
      e.returnValue = "このページを離れると、タスクを再開することはできません。このページを離れますか？";
      return "このページを離れると、タスクを再開することはできません。このページを離れますか？";
    };
  }, []);

  return (
    <div>
      <main>
        <div className="invisible md:visible md:mt-8 md:w-full">
          <StepCard step={3} />
        </div>
        <div className={markdownStyle["markdown"]}>
          <h2>事後アンケート</h2>
          <p>事後アンケートにお答えください。質問は全部で15問あり、想定所要時間は5分程度です。</p>
          <h2>注意事項</h2>
          <ul>
            <li>
              アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは
              <strong>開いたまま</strong>にしてください。
            </li>
            <li>
              アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面からタスクを再開してください。
            </li>
            <li>アンケートページは一度閉じると、もう一度表示することはできません。</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <a target="_blank" rel="noreferrer" href={`${enquete[assignment.condition]}${user.id}`}>
            <button
              className={`btn ${isEnqueteClicked ? "btn-disabled" : "btn-primary"}`}
              onClick={() => {
                setClicked(true);
                window.onbeforeunload = null;
              }}
            >
              アンケートページへ
            </button>
          </a>
        </div>
        <div className="mt-32 text-right">
          {isEnqueteClicked ? (
            <NavigationButton href={"/code"} ready={isEnqueteClicked} title={"完了コード発行"} />
          ) : (
            <div className="tooltip tooltip-warning" data-tip="アンケートに回答してください">
              <NavigationButton href={"/code"} ready={isEnqueteClicked} title={"完了コード発行"} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
