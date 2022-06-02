import React from "react";

interface IProps {
  show: boolean;
}
const Alert = ({ show }: IProps) => {
  if (!show) return <></>;
  return (
    <div className="absolute top-0 left-0 w-72 h-72 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200"></div>
  );
};

export default Alert;
