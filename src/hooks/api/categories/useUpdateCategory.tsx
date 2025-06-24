"use client";

import { axiosInstance } from "@/lib/axios";
import { Category } from "@/types/categories.type";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useUpdateCategory = () => {
  const [isLoading, setIsloading] = useState(false);

  const updateCategory = async (
    id: string,
    payload: {
      name: string;
    }
  ) => {
    setIsloading(true);
    try {
      await axiosInstance.put<Category>(`/categories/${id}`, {
        name: payload.name,
      });
      toast.success("Update Category success !");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsloading(false);
    }
  };

  return { updateCategory, isLoading };
};
