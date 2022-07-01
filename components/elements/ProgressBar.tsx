import React, { useEffect } from "react";

interface IProps {
  percent: number;
  className?: string;
}
const ProgressBar = ({ percent, className }: IProps) => {
  return (
    <div
      className={
        className +
        " bg-gradient-to-r from-sky-400 to-pink-500  border overflow-hidden"
      }
    >
      <div
        className="bg-white float-right  h-full"
        style={{ width: `${percent <= 100 ? 100 - percent : 0}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
