"use client";

import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteArticle = () => {
  const router = useRouter();

  const deleteArticle = async (id: string) => {
    try {
      await axiosInstance.delete(`/articles/${id}`);
      toast.success("Article deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete article");
      console.error(error);
    }
  };

  return { deleteArticle };
};
