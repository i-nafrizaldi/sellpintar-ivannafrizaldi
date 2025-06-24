"use client";

import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useCreateArticle = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post<{ imageUrl: string }>(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  };

  const createArticle = async (payload: {
    title: string;
    content: string;
    categoryId: string;
    imageFile?: File;
  }) => {
    setIsloading(true);
    try {
      let imageUrl: string | null = null;

      if (payload.imageFile) {
        imageUrl = await uploadImage(payload.imageFile);
      }

      await axiosInstance.post<Article>("/articles", {
        title: payload.title,
        content: payload.content,
        categoryId: payload.categoryId,
        imageUrl,
      });
      toast.success("Create article success !");
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Failed to create article");
      }
    } finally {
      setIsloading(false);
    }
  };

  return { createArticle, isLoading };
};
