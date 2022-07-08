import TextBox from "@elements/TextBox";
import { Example, QuestionCard } from "interfaces";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CardContex } from "./AddCard";
import Examples from "./Examples";
interface Inputs {
  exampleText: string;
}
interface IProps {
  example: string;
  setExample: (example: string) => void;
  onAdd: () => void;
}

const AddExample = ({ example, setExample, onAdd }: IProps) => {
  return (
    <div>
      <TextBox
        lableText="Examples"
        className={"m-2 "}
        value={example}
        onChange={(e) => setExample(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 active:scale-90 cursor-pointer text-violet-600"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={onAdd}
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      </TextBox>
      <Examples />
    </div>
  );
};

export default AddExample;
