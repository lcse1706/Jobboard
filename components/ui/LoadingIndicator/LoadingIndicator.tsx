import "./style.css";

export const LoadingIndicator = () => {
  return (
    <div className="text-gray-600 dark:text-white">
      <div className="lds-facebook  ">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
