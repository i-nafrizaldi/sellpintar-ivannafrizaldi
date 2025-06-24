"use client";

import { Article } from "@/types/article.type";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { format } from "date-fns";
import PaginationControls from "./Pagination";
import { useRouter } from "next/navigation";

interface Props {
  articles: Article[];
  isLoading: boolean;
  meta: {
    pageCount: number;
  } | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ArticlePage = ({
  articles,
  isLoading,
  meta,
  currentPage,
  onPageChange,
}: Props) => {
  const router = useRouter();

  return (
    <div className="pt-10 pb-[60px] px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
            ))
          : articles.map((article) => (
              <div
                key={article.id}
                className="overflow-hidden flex gap-4 flex-col h-full cursor-pointer"
                onClick={() => router.push(`/articles/${article.id}`)}
              >
                {article.imageUrl && (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-[200px] rounded-[12px] object-cover"
                  />
                )}

                <div className="flex flex-col gap-2 flex-grow">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(article.createdAt), "MMMM d, yyyy")}
                  </p>
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {article.title}
                  </h2>
                  <div
                    className="text-sm text-muted-foreground line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  <Badge variant="secondary" className="text-xs">
                    {article.category.name}
                  </Badge>
                </div>
              </div>
            ))}
      </div>

      {meta && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={meta.pageCount}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ArticlePage;
