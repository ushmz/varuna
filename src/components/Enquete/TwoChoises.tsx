type Props = {
  id: number;
  topic: string;
  ayes: boolean;
  toggle: () => void;
};

export const TwoChoiseRadio: React.FC<Props> = (props) => {
  return (
    <div className="form-control">
      <p>あなたは「{props.topic}」を提供するウェブサービスを使用したことがありますか？</p>
      <div className="ml-4">
        <label className="flex mb-3 cursor-pointer">
          <input type="radio" className="radio radio-primary" checked={props.ayes} onChange={props.toggle} />
          <span className="mx-2">はい</span>
        </label>
        <label className="flex mb-3 cursor-pointer ">
          <input type="radio" className="radio radio-primary" checked={!props.ayes} onChange={props.toggle} />
          <span className="mx-2">いいえ</span>
        </label>
      </div>
    </div>
  );
};
