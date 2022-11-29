import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { referrer } from "@lib/config";
import markdownStyle from "@styles/markdown.module.css";

type Props = {
  code: string;
  referrer: string;
};

const Code: NextPage<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>完了コード</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto my-8">
          <div className="mb-8 text-3xl">タスクへのご協力ありがとうございました。</div>
          <div className="card rounded-lg shadow-lg bg-slate-100">
            <div className="card-title">
              <div className="my-1 text-3xl">あなたの完了コードは</div>
            </div>
            <div className="card-body text-center">
              <span className="text-4xl font-bold">{props.code}</span>
            </div>
            {/*
            <div className="card-actions justify-end">
              <button
                className="m-2 btn btn-outline"
                data-tip="コピーしました"
                data-event='click' 
                data-event-off='click'
                onClick={() => {
                  navigator.clipboard
                    .writeText(props.code)
                    .then(() => {
                      console.log("コピーしました");
                    })
                    .catch((e) => {
                      console.log("失敗しました", e);
                    });
                }}
              >
                クリップボードにコピー
              </button>
                <ReactTooltip effect="solid" delayHide={1000} />
            </div>
            */}
            <div className="justify-end card-actions">
              <div className="my-1 text-3xl">です</div>
            </div>
          </div>
        </div>

        <div className={markdownStyle["markdown"]}>
          <p>タスクへのご協力ありがとうございます。</p>
          <div>
            上記の完了コードを{props.referrer}の作業画面の「タスク完了コード」の欄に入力してください。
            完了コードを記録したら、この画面を閉じていただいて問題ありません。
          </div>
          <div>
            一度この画面を離れると、この画面は<strong>表示されません</strong>
            ので、忘れないようにメモなどをお願いいたします。
          </div>
        </div>
      </main>
    </div>
  );
};

export default Code;

export async function getServerSideProps(_: GetServerSidePropsContext) {
  return {
    props: {
      code: "56234798",
      referrer: referrer,
    },
  };
}
