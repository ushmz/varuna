import React from "react";
import { isMobile } from "react-device-detect";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Top } from "../pages/Top";
import { PreEnquete } from "../pages/PreEnquete";
import { PostEnquete } from "../pages/PostEnquete";
import { Task } from "../pages/Task";
import { Search } from "../pages/Search";
import { Code } from "../pages/Code";
import { Error } from "../pages/Error";
import { referrer } from "../lib/config";

const Router: React.FC = () => {
  if (isMobile) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="m-3">このページはスマートフォンからは利用できません。</div>
        <div className="card-body">
          <p>
            本ウェブサイトは、「{referrer}」にて掲載しているウェブ検索タスクを行っていただくためのウェブサイトです。
          </p>
          <p>このタスク行うにはパソコンからアクセスしてください。</p>
        </div>
      </div>
    );
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="m-3">このページはInternet explorerでの動作を保証していません。</div>
        <div className="card-body">
          <p>
            本ウェブサイトは、「{referrer}」にて掲載しているウェブ検索タスクを行っていただくためのウェブサイトです。
          </p>
          <p>
            このページはInternet
            explorerでの動作を保証していません。このタスク行うには他のブラウザからアクセスしてください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/enquete/pre" element={<PreEnquete />} />
        <Route path="/enquete/post" element={<PostEnquete />} />
        <Route path="/task" element={<Task />} />
        <Route path="/search" element={<Search />} />
        <Route path="/code" element={<Code />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
