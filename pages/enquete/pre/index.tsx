import Head from "next/head";
import markdownStyle from "@styles/markdown.module.css";
import { NextPage } from "next";
import StepCard from "@components/StepCard";
import { useState } from "react";
import NavigationButton from "@components/NavigationButton";
import { getEnqueteBySlug } from "@lib/api/content";
import markdownToHTML from "@lib/markdownToHTML";
import { TwoChoiseRadio } from "@components/Enquete/TwoChoises";
import { useRecoilState, useRecoilValue } from "recoil";
import { assignmentState } from "@lib/store/assignment";
import { assignTask } from "@lib/api/user";
import { useRouter } from "next/router";
import { userState } from "@lib/store/user";

type Props = {
  slug: string;
  title: string;
  url: string;
  step: number;
  forward: {
    url: string;
    title: string;
  };
  content: string;
};

const PreEnquete: NextPage<Props> = (props: Props) => {
  const [task1Ayes, setTask1Ayes] = useState<boolean>(false);
  const [task2Ayes, setTask2Ayes] = useState<boolean>(false);

  const router = useRouter();

  // If you want to stay users on this page, use this.
  const isEnqueteClicked = true;

  const userInfo = useRecoilValue<UserInfo>(userState);
  const [assignment, setAssignment] = useRecoilState<Assignment>(assignmentState);

  const onSubmit = async () => {
    const assign = await assignTask(userInfo.id, userInfo.token);
    console.log("PreEnquete: ", assign);
    setAssignment(assign);
    router.push(`/task/${assign.taskId}`);
  }

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="invisible md:visible md:mt-8 md:w-full">
          <StepCard step={props.step} />
        </div>
        <div className={markdownStyle["markdown"]} dangerouslySetInnerHTML={{ __html: props.content }}></div>
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
            <NavigationButton
              href=""
              onClick={onSubmit}
              ready={isEnqueteClicked}
              title="検索タスク"
            />
          ) : (
            <div className="tooltip tooltip-warning" data-tip="アンケートに回答してください">
              <NavigationButton href={`/task/${assignment.taskId}`} ready={isEnqueteClicked} title="検索タスク" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PreEnquete;

export async function getStaticProps() {
  const enquete = getEnqueteBySlug("pre", ["slug", "title", "url", "step", "forward", "content"]);

  const htmlContent = await markdownToHTML(enquete.content);
  return {
    props: {
      slug: enquete.slug,
      title: enquete.title,
      url: enquete.url,
      step: enquete.step,
      forward: enquete.forward,
      content: htmlContent,
    },
  };
}
