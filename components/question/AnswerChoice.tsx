import Button from "@elements/Button";
import { AnswerChoice } from "interfaces";
import React from "react";
interface IProps {
  choice: AnswerChoice;
  index: number;
  onCheck: (selectedChoice: AnswerChoice) => void;
  reveal: boolean;
}
const AnswerChoiceBox = ({ choice, index, onCheck, reveal }: IProps) => {
  return (
    <div
      onClick={() => onCheck(choice)}
      className={
        "border  rounded-lg shadow mt-2 gap-4 grid grid-cols-8 overflow-hidden cursor-pointer  hover:shadow-lg transition text-lg capitalize " +
        (reveal && (choice.isCorrect ? "bg-green-600" : "bg-red-600"))
      }
    >
      <div className="bg-cyan-50 w-9 ">
        <p className="p-2 text-center ">{index + 1}</p>
      </div>
      <p
        className={
          "text-gray-600 col-span-7 p-2 " +
          (reveal && (choice.isCorrect ? "text-green-200" : "text-red-200"))
        }
      >
        {choice.text}
      </p>
    </div>
  );
};

export default AnswerChoiceBox;
