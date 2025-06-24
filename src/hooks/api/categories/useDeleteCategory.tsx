"use client";

import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const router = useRouter();

  const deleteCategory = async (id: string) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      toast.success("Category deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  return { deleteCategory };
};
