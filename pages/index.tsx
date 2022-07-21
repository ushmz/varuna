import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { getTopPageContent } from "@lib/api";
import markdownToHTML from "@lib/markdownToHTML";
import { setAssignedTasks } from "@lib/storage";
import styles from "@styles/pages/home.module.css";
import markdownStyle from "@styles/markdown.module.css";

type Props = {
  csName: string;
  nextPath: string;
  content: string;
};

const Home: NextPage<Props> = (props) => {
  const [externalID, setExternalID] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExternalID(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>検索タスクページ</title>
        <meta name="description" content="検索タスクページ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className={styles.title}>検索タスク開始にあたって</h1>
          <div className={markdownStyle.markdown}>
            <p>
              本ウェブサイトは、クラウドソーシングサービス{props.csName}
              にて掲載している検索タスクを行っていただくためのサイトです。
            </p>
            <div dangerouslySetInnerHTML={{ __html: props.content }} />
            <p>
              以上に同意していただける方は、以下の入力欄に「{props.csName}ユーザ名」を入力し、
              「タスクを開始する」ボタンをクリックしてタスクを開始してください。
            </p>
          </div>
          <form className="mt-8">
            <label htmlFor="external-id" className="block text-sm font-medium text-gray-700">
              {props.csName}ユーザ名（ユーザ名は半角英数字と記号 (-_) を用いて入力してください）
            </label>
            <input
              id="external-id"
              className="block w-[360px] py-2 px-3 mt-1 border border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
              type="text"
              placeholder={`${props.csName}ID`}
              onChange={handleChange}
            />
            <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
              ユーザ名は半角英数字と記号 (-_) を用いて入力してください
            </p>
            <div className="mt-16">
              <Link href={props.nextPath || "#"} as={props.nextPath || "#"}>
                <a>
                  <button
                    onClick={() => {
                      fetch("/api/user", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ externalID: externalID }),
                      })
                        .then((r) => r.json())
                        .then((d) => {
                          setAssignedTasks(d["tasks"]);
                        });
                    }}
                    type="submit"
                    className="h-[50px] w-[175px] bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
                  >
                    {false ? "Loader" : "タスクを開始する"}
                  </button>
                </a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const CROWDSOURCING_SITE_NAME = process.env.CROWDSOURCING_SITE_NAME || "";
  const top = getTopPageContent(["title", "nextPath", "content"]);
  const htmlContent = await markdownToHTML(top.content);

  return {
    props: {
      csName: CROWDSOURCING_SITE_NAME,
      nextPath: top.nextPath,
      content: htmlContent,
    },
  };
};
