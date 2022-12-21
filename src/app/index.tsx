import React from "react";
import { RecoilRoot } from "recoil";
import Router from "./routes";

const App = (): React.ReactElement => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};

export default App;
