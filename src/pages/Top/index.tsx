import { useEffect, useState } from "react";
import { referrer } from "../../lib/config";
import { simplifiedSignUp } from "../../lib/api/user";
import { useRecoilState } from "recoil";
import { userState } from "../../lib/store/user";
import { Loader } from "../../components/Loader";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { UserInfo } from "../../lib/api/type";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/pages/home.module.css";
import markdownStyle from "../../styles/markdown.module.css";

export const Top: React.FC = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userState);
  // const [assignment, setAssignment] = useRecoilState<Assignment>(assignmentState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formEffect, setFormEffect] = useState<boolean>(false);

  useEffect(() => {
    document.title = "検索タスクページ";
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitUser = async () => {
    const user = await simplifiedSignUp(watch("externalID"));
    setUserInfo(user);
    // const task = await assignTask(user.id, user.token);
    // setAssignment(task);
  };

  const onSubmit = async () => {
    setLoading(true);
    toast.promise(submitUser(), {
      loading: "登録しています...",
      success: () => {
        setLoading(false);
        navigate("/enquete/pre");
        return <b>登録しました</b>;
      },
      error: () => {
        setLoading(false);
        return <b>登録に失敗しました。申し訳ありませんが、時間をおいてお試しください。</b>;
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Toaster />
        <div className={styles.description}>
          <div className={markdownStyle.markdown}>
            <h1 className={styles.title}>検索タスク開始にあたって</h1>
            <p>
              本ウェブサイトは、クラウドソーシングサービス{referrer}
              にて掲載している検索タスクを行っていただくためのサイトです。
            </p>
            <h2>検索タスクの流れ</h2>
            <div>
              <p>
                本タスクでははじめにアンケートに回答していただきます。続いて検索タスクを行っていただきます。
                最後にもう一度アンケートに回答していただきます。タスク全体の想定時間は 20 分程度を想定しております。
              </p>
              <h2>注意事項</h2>
              <p>
                タスク中、ページ閲覧ログを収集させていただきます。
                収集したログはすべて匿名化され、静岡大学情報学部における学術研究目的にのみ利用されます。
              </p>
            </div>
            <p>
              以上に同意していただける方は、以下の入力欄に「{referrer}ユーザ名」を入力し、
              「タスクを開始する」ボタンをクリックしてタスクを開始してください。
            </p>
          </div>
          <form className="mt-8 px-36" onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto mt-16">
              <label htmlFor="external-id" className="block text-sm font-medium text-gray-700">
                {referrer}ユーザ名（ユーザ名は半角英数字と記号 (-_) を用いて入力してください）
              </label>
              <input
                id="external-id"
                className={`${
                  formEffect && "animate-[wiggle_1s_ease-in-out]"
                } w-full py-2 px-3 mt-1 border border-gray-400 focus:border-indigo-500 shadow-sm text-sm rounded-md `}
                type="text"
                placeholder={`${referrer}ID`}
                {...register("externalID", { required: true })}
              />
              {errors.externalID && <div className="text-red-400 text-sm">{`${referrer}IDを入力してください`}</div>}
              <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
                ユーザ名は半角英数字と記号 (-_) を用いて入力してください
              </p>
            </div>
            <div className="mt-16 mb-32 text-center">
              <button
                type="submit"
                className="h-[50px] bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
                onClick={() => setFormEffect(true)}
                onAnimationEnd={() => setFormEffect(false)}
              >
                {isLoading ? <Loader /> : "タスクを開始する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
