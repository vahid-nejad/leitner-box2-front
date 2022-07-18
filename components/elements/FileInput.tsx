import React, { useState } from "react";
import Button from "./Button";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  lablText?: string;
}

const FileInput = ({
  children,
  className,
  lablText,
  onChange,
  ...props
}: IProps) => {
  const [fileName, setFileName] = useState("");
  function fileChangedHandler(e: any) {
    const file = e.target.files[0];
    setFileName(file.name);
    onChange && onChange(e);
  }
  return (
    <div className={className}>
      {lablText && (
        <label
          className="block text-gray-600 text-xs lg:text-sm xl:text-base mb-2"
          htmlFor="txt"
        >
          {lablText}
        </label>
      )}
      <label
        className={" w-full block relative border  rounded-md cursor-pointer  "}
      >
        <div
          className={
            " inline-block h-full  py-3 rounded-l-md px-2 bg-violet-500 text-white font-bold "
          }
        >
          <input
            className="hidden"
            onChange={(e) => fileChangedHandler(e)}
            {...props}
            type="file"
          />
          Choose File
        </div>
        <span className="mx-2">{fileName}</span>
      </label>
    </div>
  );
};

export default FileInput;
