"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useDeleteArticle } from "@/hooks/api/articles/useDeleteArticle";

interface ArticleDeleteDialogProps {
  articleId: string;
  refetch: () => void;
}

export const ArticleDeleteDialog = ({
  articleId,
  refetch,
}: ArticleDeleteDialogProps) => {
  const { deleteArticle } = useDeleteArticle();

  const handleDelete = async () => {
    await deleteArticle(articleId);
    refetch();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="text-destructive underline px-0">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the article.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
