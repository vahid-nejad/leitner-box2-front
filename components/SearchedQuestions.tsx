import { QuestionCard } from "interfaces";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  questions: QuestionCard[];
}
const SearchedQuestion = ({ questions }: IProps) => {
  console.log(questions);
  const router = useRouter();

  return (
    <div>
      {questions.map((question) => (
        <div
          className="border m-2 p-2 shadow-sm hover:shadow-md cursor-pointer transition rounded"
          key={question.id}
          onClick={() => router.push(`/edit/${question.id}`)}
        >
          {question.question}
        </div>
      ))}
    </div>
  );
};

export default SearchedQuestion;
