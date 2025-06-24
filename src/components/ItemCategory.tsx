"use client";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { useState } from "react";

const ItemCategory = () => {
  const [page, setPage] = useState(1);
  const { data: categories } = useGetCategories({});
  return (
    <SelectContent>
      {categories
        .filter((cat) => !!cat.id)
        .map((cat) => (
          <SelectItem key={cat.id} value={cat.id}>
            {cat.name}
          </SelectItem>
        ))}
    </SelectContent>
  );
};

export default ItemCategory;
