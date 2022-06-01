import { Example } from "interfaces";
import React from "react";

interface IProps {
  examples: Example[];
}
const ExampleSet = ({ examples }: IProps) => {
  return (
    <div className="border p-2 mt-2 rounded-md shadow">
      <h6 className="text-cyan-600 mb-2 text-xl">Examples:</h6>
      <ul className="ml-4 list-disc">
        {examples.map((ex) => (
          <li key={ex.id}>{ex.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleSet;
