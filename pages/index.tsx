import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { getTopPageContent } from "@lib/api/content";
import { simplifiedSignUp } from "@lib/api/user";
import markdownToHTML from "@lib/markdownToHTML";
import styles from "@styles/pages/home.module.css";
import markdownStyle from "@styles/markdown.module.css";
import { useRecoilState } from "recoil";
import { userState } from "@lib/store/user";
import { Loader } from "@components/Loader";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  csName: string;
  forward: {
    title: string;
    url: string;
  };
  content: string;
};

const Home: NextPage<Props> = (props) => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userState);
  // const [assignment, setAssignment] = useRecoilState<Assignment>(assignmentState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formEffect, setFormEffect] = useState<boolean>(false);

  const router = useRouter();

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
      success: (_) => {
        setLoading(false);
        router.push("/enquete/pre");
        return <b>登録しました</b>;
      },
      error: (_) => {
        setLoading(false);
        return <b>登録に失敗しました。申し訳ありませんが、時間をおいてお試しください。</b>;
      },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>検索タスクページ</title>
        <meta name="description" content="検索タスクページ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Toaster />
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
          <form className="mt-8 px-36" onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto mt-16">
              <label htmlFor="external-id" className="block text-sm font-medium text-gray-700">
                {props.csName}ユーザ名（ユーザ名は半角英数字と記号 (-_) を用いて入力してください）
              </label>
              <input
                id="external-id"
                className={`${
                  formEffect && "animate-[wiggle_1s_ease-in-out]"
                } w-full py-2 px-3 mt-1 border border-gray-400 focus:border-indigo-500 shadow-sm text-sm rounded-md `}
                type="text"
                placeholder={`${props.csName}ID`}
                {...register("externalID", { required: true })}
              />
              {errors.externalID && <div className="text-red-400 text-sm">{`${props.csName}IDを入力してください`}</div>}
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
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const CROWDSOURCING_SITE_NAME = process.env.CROWDSOURCING_SITE_NAME || "";
  const top = getTopPageContent(["title", "forward", "content"]);
  const htmlContent = await markdownToHTML(top.content);

  return {
    props: {
      csName: CROWDSOURCING_SITE_NAME,
      forward: top.forward,
      content: htmlContent,
    },
  };
};
