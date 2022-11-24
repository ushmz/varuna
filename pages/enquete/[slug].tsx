import Head from "next/head";
import { getAllEnquetePaths, getEnqueteBySlug } from "@lib/api/content";
import markdownToHTML from "@lib/markdownToHTML";
import markdownStyle from "@styles/markdown.module.css";
import { NextPage } from "next";
import StepCard from "@components/StepCard";
import { useState } from "react";
import NavigationButton from "@components/NavigationButton";

type Props = {
  title: string;
  slug: string;
  url: string;
  step: number;
  nextPath: string;
  content: string;
};

const Enquete: NextPage<Props> = (props: Props) => {
  const [isEnqueteClicked, setClicked] = useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="md:grid md:grid-cols-3">
          <div className="invisible md:visible md:mt-16 md:col-span-1">
            <StepCard step={props.step} />
          </div>
          <div className="md:col-span-2">
            <div className={markdownStyle["markdown"]} dangerouslySetInnerHTML={{ __html: props.content }} />
            <div className="mt-8 text-center">
              <button
                className={`btn ${isEnqueteClicked ? "btn-disabled" : "btn-primary"}`}
                onClick={() => setClicked(true)}
              >
                アンケートページへ
              </button>
            </div>
            <div className="mt-32 text-right">
              {isEnqueteClicked ? (
                <NavigationButton href={props.nextPath} ready={isEnqueteClicked} title="検索タスク" />
              ) : (
                <div className="tooltip tooltip-warning" data-tip="アンケートに回答してください">
                  <NavigationButton href={props.nextPath} ready={isEnqueteClicked} title="検索タスク" />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Enquete;

export async function getStaticPaths() {
  const paths = getAllEnquetePaths();
  return {
    paths: paths,
    fallback: false,
  };
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const enquete = getEnqueteBySlug(params.slug, ["slug", "title", "url", "step", "nextPath", "content"]);

  const htmlContent = await markdownToHTML(enquete.content);
  return {
    props: {
      slug: enquete.slug,
      title: enquete.title,
      url: enquete.url,
      step: enquete.step,
      nextPath: enquete.nextPath,
      content: htmlContent,
    },
  };
}
