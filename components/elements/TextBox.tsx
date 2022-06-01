import React from "react";
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  lableText?: string;
  error?: string;
  children?: React.ReactNode;
}

const TextBox = React.forwardRef<HTMLInputElement, IProps>(
  ({ className, children, lableText, error, ...props }, ref) => {
    return (
      <div className={className + " relative"}>
        {lableText && (
          <label className="block text-gray-600  mb-2" htmlFor="txt">
            {lableText}
          </label>
        )}
        <input
          id="txt"
          className={
            "border w-full block outline-none py-2 px-1 lg:text-lg rounded-md bg-slate-50 focus:outline-violet-600  " +
            (error && "border-red-500 border ")
          }
          {...props}
          type={"text"}
          ref={ref}
        ></input>

        {error && <p className="text-red-600">{error}</p>}
        <div className="absolute top-11 right-3">{children}</div>
      </div>
    );
  }
);

export default TextBox;
