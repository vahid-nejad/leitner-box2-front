import React, { useEffect } from "react";
import {
  SpeakerphoneIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import ToolTip from "@elements/ToolTip";
import { getImageUrl } from "utils/fetchApi";

interface IProps {
  questionText: string;
  onNextCard: () => void;
}
const Question = ({ questionText, onNextCard }: IProps) => {
  useEffect(() => playPronounciation(), []);
  function playPronounciation() {
    if (!questionText) return;
    var audio = new Audio(
      `http://ssl.gstatic.com/dictionary/static/sounds/oxford/${questionText.trim()}--_us_1.mp3`
    );

    if (
      audio.canPlayType("audio/mp3") === "probably" ||
      audio.canPlayType("audio/mp3") === "maybe"
    ) {
      audio.play();
    }
  }

  return (
    <div className="border rounded shadow p-2 flex justify-between">
      <p className="md:text-lg lg:text-xl capitalize text-slate-600 ">
        {questionText}
      </p>
      <div className="flex gap-3">
        <SpeakerphoneIcon
          onClick={playPronounciation}
          className="w-4 text-fuchsia-600 cursor-pointer"
        />
        <ChevronDoubleRightIcon
          onClick={onNextCard}
          className="w-4 text-green-600 cursor-pointer"
        ></ChevronDoubleRightIcon>
      </div>
    </div>
  );
};

export default Question;
