import ToolTip from "@elements/ToolTip";
import { EyeIcon } from "@heroicons/react/solid";
import { AnswerChoice } from "interfaces";
import React from "react";
import AnswerChoiceBox from "./AnswerChoice";

interface IProps {
  choices: AnswerChoice[];
  onSelect: (selectedChoice: AnswerChoice) => void;
  reveal: boolean;
  setReveal: (reveal: boolean) => void;
}
const AnswerBox = ({ choices, onSelect, reveal, setReveal }: IProps) => {
  return (
    <div className="border rounded-md shadow p-2">
      <div className="flex justify-between">
        <h6 className="text-lg text-cyan-600">Choices:</h6>
        <ToolTip>
          <ToolTip.Text> Reveal!</ToolTip.Text>
          <EyeIcon
            className="w-4 text-yellow-500 hover:text-sky-500 transition cursor-pointer active:scale-90"
            onClick={() => {
              setReveal(true);
              onSelect({ text: "", isCorrect: false });
            }}
          />
        </ToolTip>
      </div>

      {choices.map((choice, index) => (
        <AnswerChoiceBox
          index={index}
          choice={choice}
          key={index}
          onCheck={(selectedChoice) => {
            setReveal(true);
            onSelect(selectedChoice);
          }}
          reveal={reveal}
        ></AnswerChoiceBox>
      ))}
    </div>
  );
};

export default AnswerBox;
