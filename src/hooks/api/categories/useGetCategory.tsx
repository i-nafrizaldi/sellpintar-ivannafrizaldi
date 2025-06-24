"use client";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Category } from "@/types/categories.type";

export const useGetCategory = (categoryId: string) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCategory = async () => {
    if (!categoryId) return;
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/categories/${categoryId}`);
      setCategory(res.data);
    } catch (error) {
      console.error("Failed to fetch category", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return { getCategory, isLoading };
};
