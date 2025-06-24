"use client";
import { TableCell, TableRow } from "@/components/ui/table";

import Link from "next/link";
import { FC } from "react";
import { CategoryDeleteDialog } from "./CategoryDeleteDialog";
import { UpdateCategoryDialog } from "@/app/dashboard/categories/components/UpdateCategoryDialog";

interface CategoryRowTableProps {
  id: string;
  key: number;
  category?: string;
  createdAt?: string;
  refetch: () => void;
}

const TableCategories: FC<CategoryRowTableProps> = ({
  id,
  key,
  refetch,
  category,
  createdAt,
}) => {
  return (
    <>
      <TableRow key={key} className="bg-white w-[225px]">
        <TableCell className="w-[225px]">{category}</TableCell>
        <TableCell className="w-[225px]">{createdAt}</TableCell>
        <TableCell className="flex gap-3 place-items-center">
          <UpdateCategoryDialog categoryId={id} refetch={refetch} />

          <CategoryDeleteDialog categoryId={id} refetch={refetch} />
        </TableCell>
      </TableRow>
    </>
  );
};
export default TableCategories;
