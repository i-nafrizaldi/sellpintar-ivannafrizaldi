"use client";

import Dropzone from "@/components/Dropzone";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { FormTextArea } from "@/components/FormTextArea";
import ItemCategory from "@/components/ItemCategory";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateArticle } from "@/hooks/api/articles/useCreateArticle";
import { ValidationSchema } from "./validationSchema";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const { createArticle, isLoading } = useCreateArticle();

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
    },
  });

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const onSubmit = (values: z.infer<typeof ValidationSchema>) => {
    if (!image) return alert("Please upload an image");

    createArticle({
      title: values.title,
      content: values.content,
      categoryId: values.categoryId,
      imageFile: image,
    });
  };
 
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-100 p-6 ">
        <div className="bg-gray-50 rounded-lg flex flex-col gap-4 p-6">
          <div className="flex gap-2 items-center">
            <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
            <h1 className="text-xl font-semibold ">Create Article</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                name="category"
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

              <div className="flex justify-end mt-auto gap-2">
                <Button
                  type="reset"
                  className="bg-white text-black"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Cancel"}
                </Button>
                <Button
                  type="button"
                  className="bg-slate-200 text-black"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Preview"}
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create Article"
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
