import React, { useEffect } from "react";
import {
  SpeakerphoneIcon,
  ChevronDoubleRightIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import ToolTip from "@elements/ToolTip";
import { getImageUrl } from "utils/fetchApi";
import { useRouter } from "next/router";
import { playPronounciation } from "utils/utillties";

interface IProps {
  questionText: string;
  questionId: number;
  onNextCard: () => void;
}
const Question = ({ questionText, onNextCard, questionId }: IProps) => {
  useEffect(() => playPronounciation(questionText), [questionText]);
  const router = useRouter();

  return (
    <div className="border rounded shadow p-2 flex justify-between">
      <p className="md:text-lg lg:text-xl capitalize text-slate-600 ">
        {questionText}
      </p>
      <div className="flex gap-3">
        <SpeakerphoneIcon
          onClick={() => playPronounciation(questionText)}
          className="w-4 text-fuchsia-600 cursor-pointer"
        />
        <ChevronDoubleRightIcon
          onClick={onNextCard}
          className="w-4 text-green-600 cursor-pointer"
        ></ChevronDoubleRightIcon>
        <PencilIcon
          className="w-4 text-fuchsia-600 cursor-pointer"
          onClick={() => router.push(`/edit/${questionId}`)}
        ></PencilIcon>
      </div>
    </div>
  );
};

export default Question;
