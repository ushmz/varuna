import Head from "next/head";
import { getEnqueteBySlug } from "@lib/api/content";
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
  forward: {
    title: string;
    url: string;
  };
  content: string;
};

const PostEnquete: NextPage<Props> = (props: Props) => {
  const [isEnqueteClicked, setClicked] = useState<boolean>(false);

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
            <NavigationButton href={props.forward.url} ready={isEnqueteClicked} title={props.forward.title} />
          ) : (
            <div className="tooltip tooltip-warning" data-tip="アンケートに回答してください">
              <NavigationButton href={props.forward.url} ready={isEnqueteClicked} title={props.forward.title} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostEnquete;

export async function getStaticProps() {
  const enquete = getEnqueteBySlug("post", ["slug", "title", "url", "step", "forward", "content"]);

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
