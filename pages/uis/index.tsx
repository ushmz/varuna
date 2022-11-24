import { IconUI } from "@components/IconUI";
import { RatioUI } from "@components/RatioUI";
import { NextPage } from "next";
import Head from "next/head";

const UIs: NextPage = () => {
  return (
    <div>
      <Head>
        <title>UIs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <IconUI
          title={"Computer while decade majority majority who financial"}
          url={""}
          snippet={
            "Network watch then daughter social individual. Though remember friend feel rise go baby. Office Mrs together action control across. Crime character major walk ability discussion mouth"
          }
          linked={[]}
          sendClickLog={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <RatioUI
          title={"The discover could course"}
          url={""}
          snippet={
            "Kind story easy particular guy trade maybe. Good police modern lot. Simple computer bank size join live"
          }
          linked={{
            total: 0,
            distribution: [],
          }}
          sendClickLog={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </main>
    </div>
  );
};

export default UIs;
