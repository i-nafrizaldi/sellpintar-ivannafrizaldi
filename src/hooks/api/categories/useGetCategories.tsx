import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { IPaginationMeta, IPaginationQueries } from "@/types/pagination.type";
import { Category } from "@/types/categories.type";
import { toast } from "sonner";

interface IGetCategoriesQuery extends IPaginationQueries {
  search?: string;
}

export const useGetCategories = (queries: IGetCategoriesQuery) => {
  const [data, setData] = useState<Category[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/categories", { params: queries });

      setData(res.data.data);
      setMeta({
        page: res.data.currentPage,
        pageCount: res.data.totalPages,
        total: res.data.totalData,
        take: queries.take || 10,
      });
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [queries.page, queries.search, queries.take]);

  return { data, meta, isLoading, refetch: getCategories };
};
