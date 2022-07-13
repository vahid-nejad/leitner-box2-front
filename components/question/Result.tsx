import { AnswerChoice } from "interfaces";
import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import Button from "@elements/Button";

interface IProps {
  selectedChoice?: string;
  isCorrect?: boolean;
  correctAnswer: string;
  synonym?: string;
  pot: number;
  onNext: () => void;
}

const Result = ({
  selectedChoice,
  isCorrect,
  correctAnswer,
  synonym,
  pot,
  onNext,
}: IProps) => {
  const renderSynonyms = () => (
    <ol>
      {synonym &&
        synonym.split("\n").map((syn, index) => <li key={index}>{syn}</li>)}
    </ol>
  );

  return (
    <div
      className={
        "rounded-md shadow-md border p-2 bg-gradient-to-b " +
        (isCorrect ? "from-green-100 to-teal-50" : "from-rose-100 to-pink-50")
      }
    >
      <div className="flex flex-col items-center gap-2  p-2">
        {isCorrect ? (
          <>
            <CheckCircleIcon className="w-16  text-green-600" />
            <h4 className="text-green-600 text-center capitalize">
              well done! You Selected right answer
            </h4>
            <h6 className="text-green-600 text-center capitalize">
              the right answer is: <p className="font-bold">{correctAnswer}</p>
            </h6>
            {synonym && (
              <h6 className="text-green-600 text-center capitalize">
                synonyms: {renderSynonyms()}
                {/* <p className="font-bold whitespace-pre-wrap">{synonym}</p> */}
              </h6>
            )}
          </>
        ) : (
          <>
            <ExclamationCircleIcon className="w-16 text-red-600" />
            <h4 className="text-red-600 capitalize">wrong answer!</h4>
            <h6 className="text-red-600 text-center capitalize">
              the right answer is: <p className="font-bold">{correctAnswer}</p>
            </h6>
            {synonym && (
              <h6 className="text-red-600 text-center capitalize">
                synonyms: {renderSynonyms()}
                {/* <p className="font-bold whitespace-pre-wrap">{synonym}</p> */}
              </h6>
            )}
          </>
        )}
        <p className=" text-purple-600 mt-2">
          The question {isCorrect ? "promoted" : "demoted"} to pot{" "}
          <span className="font-bold">{pot}</span>
        </p>

        <Button className="flex justify-between mt-2" onClick={onNext}>
          <span className="capitalize font-thin">Next word</span>
          <ChevronDoubleRightIcon className="w-4"></ChevronDoubleRightIcon>
        </Button>
      </div>
    </div>
  );
};

export default Result;
