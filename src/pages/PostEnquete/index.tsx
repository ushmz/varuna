import markdownStyle from "../../styles/markdown.module.css";
import StepCard from "../../components/StepCard";
import { useState } from "react";
import NavigationButton from "../../components/NavigationButton";
import { useRecoilValue } from "recoil";
import { Assignment } from "../../lib/api/type";
import { assignmentState } from "../../lib/store/assignment";

const enqueteURL =
  "https://docs.google.com/forms/d/e/1FAIpQLScGClMqW5Z0qXLAZcvIPBXX5EFvPr8pUej_c48ZkzOsmy14VQ/viewform?usp=pp_url&entry.1134254626=";

export const PostEnquete: React.FC = () => {
  const [isEnqueteClicked, setClicked] = useState<boolean>(false);

  const assignment = useRecoilValue<Assignment>(assignmentState);
  console.log(assignment);

  return (
    <div>
      <main>
        <div className="invisible md:visible md:mt-8 md:w-full">
          <StepCard step={3} />
        </div>
        <div className={markdownStyle["markdown"]}>
          <h2>事後アンケート</h2>
          <p>事後アンケートにお答えください。質問は全部で 15 問あり、想定所要時間は約 5 分です。</p>
          <h2>注意事項</h2>
          <ul>
            <li>
              アンケートページは別タブで開かれますが、アンケートページが開いてもこのページは**開いたままに**してください。
            </li>
            <li>
              アンケートへの回答が終了したらアンケートページが表示されているタブを閉じ、この画面からタスクを再開してください。
            </li>
            <li>アンケートページは一度閉じると、もう一度表示することはできません。</li>
          </ul>
          <p>実験は以上で終了となります。次のページへ進んで完了コードを発行してください。</p>
        </div>
        <div className="mt-8 text-center">
          <a target="_blank" rel="noreferrer" href={`${enqueteURL}`}>
            <button
              className={`btn ${isEnqueteClicked ? "btn-disabled" : "btn-primary"}`}
              onClick={() => setClicked(true)}
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
