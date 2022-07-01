import TextBox from "@elements/TextBox";
import { SearchIcon } from "@heroicons/react/solid";
import SearchedQuestions from "components/SearchedQuestions";
import { QuestionCard } from "interfaces";

import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getApi } from "utils/fetchApi";

interface Inputs {
  searchText: string;
}
const Search: NextPage = () => {
  const [questions, setQuestions] = useState<QuestionCard[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  async function search() {
    const res = await getApi(`/card/search/${searchText}`);
    setQuestions(res);
  }
  return (
    <div>
      <TextBox
        lableText="Question"
        className={"m-2 "}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      >
        <SearchIcon
          className="h-5 w-5 active:scale-90 cursor-pointer text-violet-600"
          onClick={search}
        />
      </TextBox>
      <SearchedQuestions questions={questions}></SearchedQuestions>
    </div>
  );
};

export default Search;
