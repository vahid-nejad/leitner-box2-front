import React from "react";
interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  lableText?: string;
  error?: string;
  children?: React.ReactNode;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, IProps>(
  ({ className, children, lableText, error, ...props }, ref) => {
    return (
      <div className={className + " relative"}>
        {lableText && (
          <label
            className="block text-gray-600 text-xs lg:text-sm xl:text-base mb-2"
            htmlFor="txt"
          >
            {lableText}
          </label>
        )}
        <div className="flex items-center">
          <textarea
            id="txt"
            className={
              "border w-full block outline-none py-2 px-1  text-xs lg:text-sm xl:text-base rounded-md bg-slate-50 focus:outline-violet-600  " +
              (error && "border-red-500 border ")
            }
            {...props}
            ref={ref}
          ></textarea>

          <div className="-ml-7">{children}</div>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;
