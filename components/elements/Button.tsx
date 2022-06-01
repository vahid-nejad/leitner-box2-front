import React from "react";
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "danger" | "success";
}
const Button = ({ className, children, variant, ...props }: IProps) => {
  const getVariant = () => {
    switch (variant) {
      case "primary":
        return "bg-violet-500 hover:bg-violet-700 text-white ";
      case "danger":
        return "bg-red-500 hover:bg-red-700 text-white ";
      case "success":
        return "bg-green-500 hover:bg-green-700 text-white ";
      default:
        return "bg-violet-500 hover:bg-violet-700 text-white ";
    }
  };

  return (
    <button
      {...props}
      className={
        className +
        " " +
        getVariant() +
        " transition font-bold py-2 px-4 rounded-md active:scale-95 "
      }
    >
      {children}
    </button>
  );
};

export default Button;
