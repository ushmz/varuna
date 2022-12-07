type LoaderProps = {
  alt?: string;
};

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div className="flex justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        <span className="invisible visually-hidden">{props.alt || "Loading..."}</span>
      </div>
    </div>
  );
};
