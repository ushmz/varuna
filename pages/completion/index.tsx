import completionStyles from "@styles/pages/completion.module.css";
import Head from "next/head";
import { NextPage } from "next";
import React from "react";

type Props = {
  code: string | number;
};

const CompletionCode: NextPage<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>完了コード</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>完了コード</h2>
      <div className={completionStyles.card}>
        <div className={completionStyles.cardContent}>
          <div className="mb-4">
            <h3 className="h-16 text-xl leading-snug">完了コード</h3>
          </div>
          <div className="grow">
            <p className="text-gray-500 dark:text-slate-300">{props.code}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionCode;
