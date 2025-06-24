import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useUpdateCategory } from "@/hooks/api/categories/useUpdateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidationSchema } from "./ValidationSchema";
import { useGetCategory } from "@/hooks/api/categories/useGetCategory";

interface UpdateCategoryDialogProps {
  categoryId: string;
  refetch: () => void;
}

export function UpdateCategoryDialog({
  categoryId,
  refetch,
}: UpdateCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const { updateCategory, isLoading } = useUpdateCategory();
  const { category } = useGetCategory(categoryId);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category?.id) {
      form.reset({
        name: category.name,
      });
    }
  }, [category]);

  const onSubmit = async (values: z.infer<typeof ValidationSchema>) => {
    await updateCategory(categoryId, { name: values.name });
    refetch();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="underline cursor-pointer" variant="link">
          Edit Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormInput
                  name="name"
                  type="text"
                  label="Category"
                  placeholder="Enter category"
                  form={form}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-blue-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
