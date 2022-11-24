import React from 'react';

import { SearchResult } from '../SearchResult';
import style from './Ratio.module.css';

type LinkedPageDistribution = {
    category: string;
    count: number;
}

type RatioUIProps = {
  title: string;
  url: string;
  snippet: string;
  linked: {
    total: number;
    distribution: LinkedPageDistribution[];
  };
  sendClickLog: () => void;
  sendHoverLog?: () => void;
};

export const RatioUI: React.FC<RatioUIProps> = (props) => {
  return (
    <div onMouseEnter={props.sendHoverLog}>
      <SearchResult title={props.title} url={props.url} snippet={props.snippet} sendClickLog={props.sendClickLog} />
      <div className={style['nudge']}>
        <h4 className={style['suggestion-title']}>
          上のページを閲覧すると，以下のウェブサイトでも
          <br />
          上記ページの閲覧履歴を記録・分析される可能性があります（{props.linked.total}件）
        </h4>

        <div className={'flex'}>
          {props.linked.distribution.map((v, idx) => (
            <div key={idx} className={style['ratio-column']}>
              {/* Set className="d-flex justify-content-center" to centerize */}
              <div className={style['ratio-category']}>{v.category}</div>
              <div className={style['ratio']}>{`${Math.ceil((v.count / props.linked.total) * 1000) / 10}%（${
                v.count
              } 件）`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
