import ProgressBar from "@elements/ProgressBar";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getApi } from "utils/fetchApi";

const Stat: NextPage = () => {
  const [wordCounts, setWordCounts] = useState<number[]>([]);
  const [potSize, setPotSize] = useState<number[]>([]);
  useEffect(() => {
    async function fetchStatistics() {
      const res = await getApi("/card/wordInPots/all");
      setWordCounts(res.wordsInPot);
      setPotSize(res.potSize);
    }
    fetchStatistics();
  }, []);
  return (
    <div>
      <div className="border m-6 rounded-md shadow">
        <h3 className="capitalize border-b mb-2 p-2 text-lg text-cyan-500">
          Word Count in each pot
        </h3>

        {wordCounts.map((el: number, index: number) => (
          <div className="grid grid-cols-6">
            <p
              key={index}
              className={
                (el >= potSize[index] ? "text-cyan-600 " : "") + " p-2"
              }
            >
              word in pot {index}: {el} / {potSize[index]}
            </p>
            <ProgressBar
              className={"col-span-3 m-1 rounded-lg"}
              percent={(el / potSize[index]) * 100}
            />
          </div>
        ))}
        <p className=" mt-3 m-1 border-t pt-2 text-slate-600">
          Total Words:{" "}
          <span className="text-sky-600">
            {wordCounts.reduce((prev, el) => el + prev, 0)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Stat;
