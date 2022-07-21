import type { NextApiRequest, NextApiResponse } from "next";

export type SearchPage = {
  id: number;
  title: string;
  url: string;
  snippet: string;
  attributes: {
    name: string;
    value: string;
    color: string;
  }[];
};

export type SerpResponse = {
  data: SearchPage[];
};

export type ErrorResponse = {
  message: string;
};

const searchHandler = (req: NextApiRequest, res: NextApiResponse<SerpResponse | ErrorResponse>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Not allowed" });
  }

  res.json({
    data: [
      {
        id: 302,
        title: "プラスチック感謝する見出し鉱山合計。",
        url: "http://mori.com/",
        snippet:
          "コーラストーン出演者フェミニストキャビン普通の出演者バナー。クルー雪探査パイオニア試してみる細かい再現する。主人サンプルリフト彼。暖かい反射証言する職人サンプルマリンスマッシュ装置。状況風景バナー暖かいコンペ今じぶんの。ハードウェアスキーム特徴画面教授ブレーキ。ハードウェア〜奨励しますマリン教授癌。式証言するサラダデフォルト教会学生野球。",
        attributes: [
          { name: "Third Party Tracking", value: "Yes", color: "#22C55E" },
          { name: "Access Scope", value: "Edit / Delete", color: "#EF4444" },
          { name: "Data Retention", value: "limited", color: "#3B82F6" },
        ],
      },
      {
        id: 303,
        title: "感謝する腐った持つ行進指名拡張。",
        url: "https://www.ikeda.jp/",
        snippet:
          "特徴ボトルテント器官戦略的。高い野球倫理風景月午前。学生月行進虐待葉厳しい。知覚追放するリニア。バーゲン指名敵。憲法ジャム索引怒り軸トス試してみる。軸溝合計厳しい証言する彼女運。サラダプラスチック憲法供給スキーム溝。持つリフト戦略的オークションダイヤモンドサワー鉱山連続。式催眠術軸スマッシュ普通の転倒評議会。",
        attributes: [
          { name: "Access Scope", value: "Edit / Delete", color: "#EF4444" },
          { name: "Third Party Tracking", value: "Yes", color: "#22C55E" },
          { name: "Data Retention", value: "limited", color: "#3B82F6" },
        ],
      },
      {
        id: 304,
        title: "電話トス探査持つサワーログ転倒。",
        url: "http://www.kato.jp/",
        snippet:
          "虐待脊椎パンパーセントインチ月。明らかにするサンプル持つ品質副供給極端な。錯覚省略緩む学生軸。コンペパン錯覚近代化する。持つ文言ニュース教授目的〜。オークション編組陶器運楽しんで。〜催眠術狭いブラケット戦略的はあなた自身ハンマー。不自然なジャム怒り副コンペデフォルトノート。普通の数字タワー呼ぶ残るバーゲンリンク。移動スキームプラスチックメニュー見出し。残る細かいオークション状況厳しい。",
        attributes: [],
      },
      {
        id: 305,
        title: "敵発生するデッドバスケットバスケット。",
        url: "http://www.hasegawa.jp/",
        snippet:
          "ブラケット午前目的雪パン協力リフトヘア。ジャーナル販売分割〜主人葉ノート。近代化するヘアダイヤモンド彼女建築メニュー。リンク戦略的数字コンペ私ささやき呼ぶ。欠乏保証金トリビュート電池ヘア。障害目的クロスマリン今日隠す見落とす。バスケット織る舗装改善チーズ。リニアキャビネット持つ再現する。ヒット今日敵評議会協力コピー。再現するソース隠すクール彼女再現するカラム。衝突屋根裏クルー連続。",
        attributes: [
          { name: "Data Retention", value: "limited", color: "#3b82f6" },
          { name: "Third Party Tracking", value: "Yes", color: "#22c55e" },
          { name: "Access Scope", value: "Edit / Delete", color: "#ef4444" },
        ],
      },
      {
        id: 306,
        title: "腐った本質的な再現するチーズ。",
        url: "https://sasaki.jp/",
        snippet:
          "暖かい管理するトレーナー中央。仕上げ持っていましたリハビリ尿フェミニスト叔父。持つニュースアクセルペダル近代化する。高い分割主婦軸ヘア再現するコミュニティささやき。賞賛する符号敵対的な分割衝突教授クロス柔らかい。月癌彼女ジャム特徴知覚。君は憲法細かいヒット極端なそれ見出し。ジャーナル教会ジャムログ。感謝するバナーは普通の。見落とす風景ハンマー職人。錯覚極端なジャーナル。",
        attributes: [],
      },
      {
        id: 307,
        title: "人形あった明らかにする。",
        url: "https://www.yamada.jp/",
        snippet:
          "電池器官クール屋根裏。意図合計建築ブランチは。私改善クールトースト出演者。スマッシュジャムトスベルベットベルベットログ。画面見出しトリビュート。学生販売評議会マリン拡張楽しんで供給教会。月トリビュート改善クロス陶器。索引見落とす編組バケツ差別する尿。探査自体追放する数字保証金コピー出演者。は行進ささやき屋根裏。",
        attributes: [
          { name: "Access Scope", value: "Edit / Delete", color: "#EF4444" },
          { name: "Data Retention", value: "limited", color: "#3B82F6" },
        ],
      },
      {
        id: 308,
        title: "器官リニア革新テントボトルリハビリ高い敵。",
        url: "http://kobayashi.net/",
        snippet:
          "ハードウェア試してみる本質的なダイヤモンド軸コミュニティ。保持する証言する建築拡張スキーム仕上げ。バーゲン立派なコミュニケーションメニューベルベット職人。同行バーゲン軸戦略的。私トリビュートスマッシュ。コミュニティノートバスケットニュース協力。雪フレームダニログ電池。ダニ分割タワー舗装奨励します今日。リハビリ索引鉱山戦略的スキーム符号改善。高い本質的な私フレーム見出し風景。",
        attributes: [],
      },
      {
        id: 309,
        title: "管理するジャムカラム舗装デッド残る。",
        url: "http://www.kimura.jp/",
        snippet:
          "拡張楽しんで教会デッド助けてストレージ。催眠術拡張鉱山残るスキーム。メニュー革新クロス狐。探査評議会特徴バスケット。デフォルトじぶんの感謝するアクセルペダルダニブラケットキャビネット。鉱山血まみれのコピー電話。協力出演者式彼障害暖かい。連続パン同行。〜陶器楽しんでフェミニスト近代化する。評議会立派なニュース。改善デッド拡張舗装それ偏差。尿カレッジサワーノート。",
        attributes: [],
      },
      {
        id: 310,
        title: "動物それ血まみれのカラムジャム。",
        url: "https://hayashi.com/",
        snippet:
          "クルーメニュー見出し差別するログ反射意図。バーゲン再現する〜狭い保証金革新。文言ハンマー賞賛するカラム探査。探査欠乏ダッシュリニアテント。風景叔父バスケットプラスチック合計リハビリジャーナル。シュガー追放するマリンブランチトリビュート。ソースジャーナル見落とすデッド持っていました脊椎あった。デッド必要発生するハードウェア奨励します欠乏。",
        attributes: [
          { name: "Access Scope", value: "Edit / Delete", color: "#EF4444" },
          { name: "Data Retention", value: "limited", color: "#3B82F6" },
        ],
      },
      {
        id: 311,
        title: "あなた自身癌主婦彼ピックスマッシュ指名式。",
        url: "http://www.kobayashi.com/",
        snippet:
          "高いトーン今日トス。特徴狭い主人ブランチ保証金保証金。緩む普通のヘア葉知覚コピーメニュー不自然な。パーセント指名日曜日リハビリ敵人形障害。リハビリ彼差別するコミュニティトリビュート。オークションクールログ建築戦略的脊椎。状況虐待擁するヒール。厳しい供給キャビネットダニ腐った。メニュー知覚彼女キャビネットあなた自身午前。ハンマー教授合計職人。",
        attributes: [],
      },
    ],
  });
};

export default searchHandler;
