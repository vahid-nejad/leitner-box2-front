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

  const totalWord = wordCounts.reduce((acc, cur) => acc + cur, 0);
  return (
    <div>
      <div className="border m-6 rounded-md shadow">
        <h3 className="capitalize mb-2 p-2 text-lg text-cyan-500">
          Word Count in each pot
        </h3>

        <div className="border-b border-t">
          {wordCounts.map((el: number, index: number) => (
            <div key={el} className="grid grid-cols-7 ">
              <p
                className={
                  (el >= potSize[index] ? "text-cyan-600 " : "") +
                  " p-2 col-span-2"
                }
              >
                word in pot {index}: {el} /
                {index === 0 ? totalWord : potSize[index]}
              </p>
              <ProgressBar
                className={"col-span-3 m-1 rounded-lg"}
                percent={
                  (el / (index === 0 ? totalWord : potSize[index])) * 100
                }
              />
            </div>
          ))}
        </div>
        <p className=" mt-3 m-1   pt-2 text-slate-600">
          Total Words: <span className="text-sky-600">{totalWord}</span>
        </p>
      </div>
    </div>
  );
};

export default Stat;
