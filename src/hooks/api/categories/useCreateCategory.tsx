"use client";

import { axiosInstance } from "@/lib/axios";
import { Category } from "@/types/categories.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useCreateCategory = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const createCategory = async (payload: { name: string }) => {
    setIsloading(true);
    try {
      await axiosInstance.post<Category>("/categories", {
        name: payload.name,
      });
      toast.success("Create Category success !");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsloading(false);
    }
  };

  return { createCategory, isLoading };
};
