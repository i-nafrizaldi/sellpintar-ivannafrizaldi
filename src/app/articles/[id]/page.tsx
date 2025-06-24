"use client";

import useGetArticleList from "@/hooks/api/articles/useGetArticles";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Link from "next/link";
import useGetArticle from "@/hooks/api/articles/useGetArticle";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const articleId = id as string;

  const { data: article, isLoading } = useGetArticle(articleId);

  const { data: otherArticles, isLoading: loadingOthers } = useGetArticleList({
    page: 1,
    take: 3,
    categoryId: "",
  });

  const suggestions = otherArticles?.filter(
    (article) => article.id !== articleId
  );

  return (
    <div className="container flex flex-col md:px-40 px-5 py-10 gap-6">
      {isLoading || !article ? (
        <Skeleton className="w-full h-96 rounded-lg" />
      ) : (
        <div className=" flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground text-center">
              {format(new Date(article.createdAt), "MMMM d, yyyy", {
                locale: localeId,
              })}{" "}
              — Created by{" "}
              <span className="font-semibold">{article.user.username}</span>
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              {article.title}
            </h1>
          </div>

          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-60 md:h-[480px] object-cover rounded-xl "
            />
          )}

          <div
            className=" max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Badge variant="outline">{article.category.name}</Badge>
        </div>
      )}

      {/* Other articles suggestion */}
      <div className="">
        <h2 className="text-xl font-semibold mb-4">Other Articles</h2>
        {loadingOthers ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestions?.slice(0, 3).map((art) => (
              <Link
                key={art.id}
                href={`/articles/${art.id}`}
                className="overflow-hidden flex gap-4 flex-col h-full"
              >
                {art.imageUrl && (
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={400}
                    height={200}
                    className="w-full h-[200px] rounded-[12px] object-cover"
                  />
                )}
                <div className="flex flex-col gap-2 flex-grow">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(art.createdAt), "MMMM d, yyyy")}
                  </p>
                  <h2 className="text-lg font-semibold  line-clamp-2">
                    {art.title}
                  </h2>

                  <div
                    className="text-sm text-muted-foreground line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: art.content }}
                  />

                  <Badge variant="secondary" className="text-xs">
                    {art.category.name}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
