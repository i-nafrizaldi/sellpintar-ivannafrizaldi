"use client";

import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article.type";
import { IPaginationMeta, IPaginationQueries } from "@/types/pagination.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface IGetArticlesQuery extends IPaginationQueries {
  search?: string;
  categoryId?: string;
  userId?: string;
}

const useGetArticleList = (queries: IGetArticlesQuery) => {
  const [data, setData] = useState<Article[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getArticles = async () => {
    try {
      const res = await axiosInstance.get("/articles", { params: queries });
      setData(res.data.data);
      setMeta({
        total: res.data.total,
        page: res.data.page,
        take: 9,
        pageCount: Math.ceil(res.data.total / res.data.limit),
      });

      let articles = res.data.data;
      if (queries.categoryId && queries.categoryId !== "all") {
        articles = articles.filter(
          (article: Article) => article.categoryId === queries.categoryId
        );
      }

      setData(articles);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching articles:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, [
    queries.page,
    queries.search,
    queries.take,
    queries.sortOrder,
    queries.categoryId,
    queries.userId,
  ]);

  return { data, isLoading, meta, refetch: getArticles };
};

export default useGetArticleList;
