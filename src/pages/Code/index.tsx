import React, { useEffect, useState } from "react";
import { Clipboard } from "react-feather";
import { useRecoilValue } from "recoil";
import { getCompletionCode } from "../../lib/api";
import { referrer } from "../../lib/config";
import { userState } from "../../lib/store/user";
import markdownStyle from "../../styles/markdown.module.css";
import { UserInfo } from "../../types";

export const Code: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const showTipOnCopied = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1000);
  };

  const user = useRecoilValue<UserInfo>(userState);

  const [code, setCode] = useState<number>(0);
  useEffect(() => {
    document.title = "完了コード";
    (async () => {
      const code = await getCompletionCode(user.id);
      setCode(code);
    })();
  }, [user]);

  return (
    <div>
      <main>
        <div className="mx-auto my-8">
          <div className="text-2xl">タスクへのご協力ありがとうございました。あなたの完了コードは以下です。</div>
        </div>
        <div className="card text-center rounded-lg shadow-xl ">
          <div className="card-body">
            <div className="form-control">
              <div className="input-group justify-center">
                <input
                  readOnly
                  type="text"
                  value={code}
                  className="input input-bordered text-4xl font-bold bg-slate-100"
                />
                <div className={visible ? "visible" : "invisible"}>
                  <div className="tooltip tooltip-open tooltip-top" data-tip="コピーしました" />
                </div>
                <button
                  className="btn btn-square bg-slate-100"
                  onClick={() => {
                    navigator.clipboard.writeText(code.toString());
                    showTipOnCopied();
                  }}
                >
                  <Clipboard className="text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={markdownStyle["markdown"]}>
          <p>
            タスクへのご協力ありがとうございます。 上記の完了コードを{referrer}
            の作業画面の「タスク完了コード」の欄に入力してください。
          </p>
          <p>
            一度この画面を離れると、この画面は<strong className="text-red-500">表示されません</strong>
            ので、忘れないようにメモなどをお願いいたします。
          </p>
          <p>完了コードを記録したら、この画面を閉じていただいて問題ありません。</p>
        </div>
      </main>
    </div>
  );
};
