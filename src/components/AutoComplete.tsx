"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { debounce } from "lodash";
import useGetArticleList from "@/hooks/api/articles/useGetArticles";
import AsyncSelect from "react-select/async";

interface ArticleOption {
  value: string;
  label: string;
}

const AutoComplete = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { data, isLoading } = useGetArticleList({
    search,
    take: 0,
  });
  const loadOptions = (
    inputValue: string,
    callback: (options: ArticleOption[]) => void
  ) => {
    try {
      const options = data.map((article) => {
        return {
          label: article.title,
          value: article.id,
        };
      });
      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };

  const debounceLoadOption = debounce(loadOptions, 750);
  return (
    <AsyncSelect
      placeholder="Search for articles"
      className="bg-white text-black"
      loadOptions={debounceLoadOption}
      isLoading={isLoading}
      onChange={(article) => {
        router.push(`/articles/${article?.value}`);
      }}
    />
  );
};
export default AutoComplete;
