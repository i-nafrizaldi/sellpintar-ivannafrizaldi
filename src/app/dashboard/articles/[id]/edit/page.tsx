"use client";

import Dropzone from "@/components/Dropzone";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { FormTextArea } from "@/components/FormTextArea";
import ItemCategory from "@/components/ItemCategory";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateArticle } from "@/hooks/api/articles/useUpdateArticle";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article.type";
import { ValidationSchema } from "./ValidationSchema";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const Page = () => {
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [initialArticle, setInitialArticle] = useState<Article | null>(null);
  const { updateArticle, isLoading } = useUpdateArticle();

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    const fetchArticle = async () => {
      const { data } = await axiosInstance.get<Article>(`/articles/${id}`);
      setInitialArticle(data);
      form.reset({
        title: data.title,
        content: data.content,
        categoryId: data.category.id,
      });
    };

    if (id) fetchArticle();
  }, [id, form]);

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const onSubmit = (values: z.infer<typeof ValidationSchema>) => {
    if (!id) return;

    updateArticle(id.toString(), {
      title: values.title,
      content: values.content,
      categoryId: values.categoryId,
      imageFile: image ?? undefined,
    });
  };

  if (!initialArticle) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-100 p-6">
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-xl font-semibold mb-4">Edit Article</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Dropzone
                handleImageClick={handleImageClick}
                handleImageChange={handleImageChange}
                inputRef={inputRef}
                name="imageUrl"
                type="file"
              />
              <FormInput
                name="title"
                type="text"
                label="Title"
                placeholder="Enter title"
                form={form}
              />
              <FormSelect
                name="categoryId"
                label="Category"
                placeholder="Select category"
                form={form}
                item={<ItemCategory />}
              />
              <FormTextArea
                form={form}
                label="Content"
                name="content"
                placeholder="Write article content..."
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="bg-gray-300 text-black"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Update Article"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default AdminAuthGuard(Page);
