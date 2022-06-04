import React from "react";

interface IProps {
  show: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
}
const Alert = ({ show, className, children, onClose }: IProps) => {
  const keydownHandler = ({ key }: KeyboardEventInit) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  if (!show) return <></>;
  return (
    <div className="p-3 absolute transition-all top-0 left-0 w-screen h-screen backdrop-filter backdrop-blur bg-opacity-30 bg-white border border-gray-200 z-50 firefox:grayscale ">
      <div
        className={
          className +
          " absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Alert;
