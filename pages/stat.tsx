import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getApi } from "utils/fetchApi";

const Stat: NextPage = () => {
  const [wordCounts, setWordCounts] = useState<number[]>([]);
  useEffect(() => {
    async function fetchStatistics() {
      const res = await getApi("/card/wordInPots/all");
      setWordCounts(res);
    }
    fetchStatistics();
  }, []);
  return (
    <div>
      <div className="border m-6 rounded-md shadow">
        <h3 className="capitalize p-2 text-lg text-cyan-500">
          Word Count in each pot
        </h3>
        <div className="border-b"></div>
        {wordCounts.map((el: number, index: number) => (
          <p className="p-2" key={index}>
            {" "}
            word in pot {index}: {el}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Stat;
