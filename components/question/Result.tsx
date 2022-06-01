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
  onNext: () => void;
}

const Result = ({
  selectedChoice,
  isCorrect,
  correctAnswer,
  onNext,
}: IProps) => {
  return (
    <div
      className={
        "rounded-md shadow-md border " +
        (isCorrect ? "bg-green-100" : "bg-red-100")
      }
    >
      <div className="flex flex-col items-center gap-2  p-2">
        {isCorrect ? (
          <>
            <CheckCircleIcon className="w-16  text-green-600" />
            <h4 className="text-green-600 capitalize">
              well done! You Selected right answer
            </h4>
          </>
        ) : (
          <>
            <ExclamationCircleIcon className="w-16 text-red-600" />
            <h4 className="text-red-600 capitalize">wrong answer!</h4>
            <h6 className="text-red-600 capitalize">
              the right answer is{" "}
              <span className="font-bold">{correctAnswer}</span>
            </h6>
          </>
        )}

        <Button className="flex justify-between mt-2" onClick={onNext}>
          <span className="capitalize font-thin">Next word</span>
          <ChevronDoubleRightIcon className="w-4"></ChevronDoubleRightIcon>
        </Button>
      </div>
    </div>
  );
};

export default Result;
