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
      <h6 className="text-lg text-cyan-600">Choices:</h6>

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
