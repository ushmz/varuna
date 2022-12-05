import Head from "next/head";
import markdownStyle from "@styles/markdown.module.css";
import { GetServerSideProps, NextPage } from "next";
import StepCard from "@components/StepCard";
import { useEffect, useState } from "react";
import NavigationButton from "@components/NavigationButton";
import { getTaskQueries, TaskQuery } from "@lib/api/user";
import { getEnqueteBySlug } from "@lib/api/content";
import markdownToHTML from "@lib/markdownToHTML";
import { getAssignedTask } from "@lib/storage";

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
  const [isEnqueteClicked, setClicked] = useState<boolean>(true);
  const [taskID, setTaskID] = useState<string>("");
  const [taskQueries, setTaskQueries] = useState({});

  useEffect(() => {
    const task = getAssignedTask();
    setTaskID(task);
  }, []);

  return (
    <div>
      <Head>
        <title>事前アンケート</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="invisible md:visible md:mt-8 md:w-full">
          <StepCard step={1} />
        </div>
        <div className={markdownStyle["markdown"]}>
          <h2>事前アンケート</h2>
          <p>タスクを行う前に以下のアンケートにお答えください。質問は全部で 2 問あり、想定所要時間は約 1 分です。</p>
          <h2>注意事項</h2>
          <p>アンケートへの回答が終了しましたら、「検索タスク」ページへ進んでください。</p>
        </div>
        <div className="mt-8 text-center">
          <input type="radio" name="radio-2" className="radio radio-primary" checked />
          <input type="radio" name="radio-2" className="radio radio-primary" />
        </div>
        <div className="mt-32 text-right">
          {isEnqueteClicked ? (
            <NavigationButton href="" onClick={() => window.location.href = `/task/${taskID}`} ready={isEnqueteClicked} title="検索タスク" />
          ) : (
            <div className="tooltip tooltip-warning" data-tip="アンケートに回答してください">
              <NavigationButton href={`/task/${taskID}`} ready={isEnqueteClicked} title="検索タスク" />
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
