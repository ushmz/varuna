type StepCardProps = {
  step: number;
};

const StepCard: React.FC<StepCardProps> = (props) => {
  return (
    <div className="card rounded w-480 shadow-lg bg-slate-50">
      <div className="card-body">
        <ul className="steps steps-horizontal">
          <li className={`step ${props.step > 0 ? "step-primary" : ""}`}>事前アンケート</li>
          <li className={`step ${props.step > 1 ? "step-primary" : ""}`}>検索タスク</li>
          <li className={`step ${props.step > 2 ? "step-primary" : ""}`}>事後アンケート</li>
        </ul>
      </div>
      {/* <div className="card-actions justify-center"></div> */}
    </div>
  );
};

export default StepCard;
