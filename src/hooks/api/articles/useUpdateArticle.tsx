"use client";

import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useUpdateArticle = () => {
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

  const updateArticle = async (
    id: string,
    payload: {
      title: string;
      content: string;
      categoryId: string;
      imageFile?: File;
    }
  ) => {
    setIsloading(true);
    try {
      let imageUrl: string | undefined;
      if (payload.imageFile) {
        imageUrl = await uploadImage(payload.imageFile);
      }

      await axiosInstance.put<Article>(`/articles/${id}`, {
        title: payload.title,
        content: payload.content,
        categoryId: payload.categoryId,
        ...(imageUrl && { imageUrl }),
      });
      toast.success("Update article success !");
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("failed update article");
      }
    } finally {
      setIsloading(false);
    }
  };

  return { updateArticle, isLoading };
};
