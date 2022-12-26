import React from "react";
import { referrer } from "../../lib/config";
import markdownStyle from "../../styles/markdown.module.css";

export const Error: React.FC = () => {
  return (
    <div>
      <main>
        <div className="mx-auto my-8">
          <div className={markdownStyle["markdown"]}>
            <h1>エラーページ</h1>
            <div>このページが表示される理由としては、以下が考えられます。</div>
            <h2>検索タスク完了後にタスク画面に直接アクセスしようとした。</h2>
            <ul>
              <li>タスクの終了後に表示される完了コードのページは、一度離れると再度表示させることはできません。</li>
              <li>
                検索タスクを行うことができるのは<strong>1回のみ</strong>
                です。1度完了コードが発行されると、それ以上検索タスクを行うことはできません。
              </li>
            </ul>
          </div>
          <div>
            このページが表示されることが間違いであると思われる場合は、お手数ですが{referrer}
            のお問い合わせ画面からご連絡ください。
          </div>
        </div>
      </main>
    </div>
  );
};
