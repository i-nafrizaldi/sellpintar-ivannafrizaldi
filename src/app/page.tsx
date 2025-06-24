"use client";
import { useRef, useState } from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArticlePage from "@/components/ArticlesCard";
import AuthGuard from "@/hoc/AuthGuard";
import useGetArticleList from "@/hooks/api/articles/useGetArticles";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import AutoComplete from "@/components/AutoComplete";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: articles,
    isLoading,
    meta,
  } = useGetArticleList({
    search,
    categoryId: categoryId,
    page,
    take: 9,
  });

  const { data: categories } = useGetCategories({
    page,
    take: 9,
  });

  const handleSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleCategoryChange = (value: string) => {
    setCategoryId(value === "all" ? "" : value);
    setPage(1);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="bg-blue-600 px-5 py-24">
        <div className="text-center text-white w-[337px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-bold text-[14px]">Blog genzet</p>
            <p className="font-semibold text-4xl">
              The Journal: Design Resources, Interview, and Industry News
            </p>
            <p className="text-xl">Your daily dose of design insights!</p>
          </div>

          <div className="bg-blue-500 flex flex-col gap-2 p-3 rounded-[12px]">
            <Select
              name="name"
              onValueChange={handleCategoryChange}
              defaultValue="all"
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder={"Select category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories
                  .filter((cat) => !!cat.id)
                  .map((cat, index) => (
                    <SelectItem key={index} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* <Input
              ref={inputRef}
              className="bg-white text-black"
              placeholder="Search Articles"
              onChange={(e) => handleSearch(e.target.value)}
            /> */}

            <AutoComplete />
          </div>
        </div>
      </div>

      {/* ARTICLES SECTION */}
      <ArticlePage
        articles={articles}
        isLoading={isLoading}
        meta={meta}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AuthGuard(Home);
