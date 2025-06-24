"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ArticleDeleteDialog } from "./ArticleDeleteDialog";

interface ArticleRowTableProps {
  id: string;
  key: number;
  imageUrl?: string | null;
  title: string;
  category?: string;
  createdAt?: string;
  refetch: () => void;
}

const TableArticles: FC<ArticleRowTableProps> = ({
  id,
  key,
  refetch,
  category,
  createdAt,
  imageUrl,
  title,
}) => {
  return (
    <>
      <TableRow key={key} className="bg-white w-[225px]">
        <TableCell className="w-[225px]">
          {" "}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={200}
              className="w-[60px] h-[60px] rounded-[12px] object-cover"
            />
          )}
        </TableCell>
        <TableCell className="w-[225px]">{title}</TableCell>
        <TableCell className="w-[225px]">{category}</TableCell>
        <TableCell className="w-[225px]">{createdAt}</TableCell>
        <TableCell className="flex gap-3 place-items-center">
          <Link href={`articles/${id}`} className="text-blue-500 underline">
            Priview
          </Link>
          <Link
            href={`dashboard/articles/${id}/edit`}
            className="text-blue-500 underline"
          >
            Edit
          </Link>

          <ArticleDeleteDialog articleId={id} refetch={refetch} />
        </TableCell>
      </TableRow>
    </>
  );
};
export default TableArticles;
