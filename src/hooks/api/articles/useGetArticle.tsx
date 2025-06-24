"use client";

import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useGetArticle = (id: string) => {
  const [data, setData] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getDetail = async () => {
    try {
      const res = await axiosInstance.get(`/articles/${id}`);
      setData(res.data);
    } catch (error) {
      if (error instanceof AxiosError) console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  return { data, isLoading };
};

export default useGetArticle;
