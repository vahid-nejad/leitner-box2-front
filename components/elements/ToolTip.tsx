import React, { ReactNode } from "react";

interface IProps {
  children: React.ReactNode;
}
const ToolTip = ({ children }: IProps) => {
  return <div className="relative group">{children}</div>;
};
interface ITextProps {
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}
const Text = ({ children, className, position }: ITextProps) => {
  function getClassName() {
    switch (position) {
      case "top":
        return "-top-10 left-1/2 -translate-x-1/2";
      case "bottom":
        return "-bottom-10 left-1/2 -translate-x-1/2";
      case "left":
        return "-left-10 top-1/2 -translate-y-1/2";
      case "right":
        return "-right-10 top-1/2 -translate-y-1/2";

      default:
        return "-top-10 left-1/2 -translate-x-1/2";
    }
  }
  return (
    <div
      className={`absolute  opacity-0 p-1 transition  bg-white rounded-lg  border  group-hover:opacity-100    ${getClassName()} ${className}`}
    >
      {children}
    </div>
  );
};

ToolTip.Text = Text;
export default ToolTip;
