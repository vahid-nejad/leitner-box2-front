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
  const renderAnswer = () => {
    const answers = choice.text
      .replace("||", "\n")
      .replace(";", "\n")
      .split("\n");
    return (
      <ol
        className={
          (answers.length > 1 ? "list-disc " : "list-none ") +
          "text-gray-600 col-span-7 -ml-4 py-2 text-sm 2xl:text-lg " +
          (reveal && (choice.isCorrect ? "text-green-200" : "text-red-200"))
        }
      >
        {answers.map((answer, index) => (
          <li className="p-0" key={index}>
            {answer.trim()}
          </li>
        ))}
      </ol>
    );
  };

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
      {renderAnswer()}
    </div>
  );
};

export default AnswerChoiceBox;
