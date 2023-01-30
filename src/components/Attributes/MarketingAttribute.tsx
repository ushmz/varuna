import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  tip?: string;
  withTip?: boolean;
};

export const MarketingAttribute: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return props.withTip ? (
    <div className="bg-red-500 rounded-full attr px-2 py-1">
      <div className="tooltip tooltip-top" data-tip={props.tip}>
        <div className="text-center font-bold text-white">{t("purpose.marketing")}</div>
      </div>
    </div>
  ) : (
    <div className="bg-red-500 rounded-full attr px-2 py-1">
      <div className="text-center font-bold text-white">{t("purpose.marketing")}</div>
    </div>
  );
};
