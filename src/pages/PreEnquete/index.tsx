import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import markdownStyle from "../../styles/markdown.module.css";
import StepCard from "../../components/StepCard";
import NavigationButton from "../../components/NavigationButton";
import { TwoChoiseRadio } from "../../components/Enquete";
import { assignmentState } from "../../lib/store/assignment";
import { assignTask } from "../../lib/api";
import { userState } from "../../lib/store/user";
import { Assignment, UserInfo } from "../../types";

export const PreEnquete: React.FC = () => {
  const [task1Ayes, setTask1Ayes] = useState<boolean>(false);
  const [task2Ayes, setTask2Ayes] = useState<boolean>(false);

  useEffect(() => {
    document.title = "事前アンケート";
  }, []);

  const navigate = useNavigate();

  // If you want to stay users on this page, use this.
  const isEnqueteClicked = true;

  const userInfo = useRecoilValue<UserInfo>(userState);
  const [assignment, setAssignment] = useRecoilState<Assignment>(assignmentState);

  const onSubmit = async () => {
    const assign = await assignTask(userInfo.id, userInfo.token, { task1: task1Ayes, task2: task2Ayes });
    setAssignment(assign);
    navigate(`/task`);
  };

  return (
    <div>
      <main>
        <div className="invisible md:visible md:mt-8 md:w-full">
          <StepCard step={1} />
        </div>
        <div className={markdownStyle["markdown"]}>
          <h2>事前アンケート</h2>
          <p>タスクを行う前に以下のアンケートにお答えください。質問は全部で 2 問あり、想定所要時間は約 1 分です。</p>
        </div>
        <div className={markdownStyle["markdown"]}>
          <h2>質問項目</h2>
          <TwoChoiseRadio
            id={1}
            topic={"オンライン英会話"}
            ayes={task1Ayes}
            toggle={() => setTask1Ayes((prev) => !prev)}
          />
          <TwoChoiseRadio id={2} topic={"家具レンタル"} ayes={task2Ayes} toggle={() => setTask2Ayes((prev) => !prev)} />
        </div>
        <div className="mt-32 text-right">
          {isEnqueteClicked ? (
            <NavigationButton onClick={onSubmit} ready={isEnqueteClicked} title="検索タスク" />
          ) : (
            <div className="tooltip tooltip-warning" data-tip="アンケートに回答してください">
              <NavigationButton ready={isEnqueteClicked} title="検索タスク" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
