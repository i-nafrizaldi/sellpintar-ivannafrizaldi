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
import { useCreateCategory } from "@/hooks/api/categories/useCreateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidationSchema } from "./ValidationSchema";
import { useState } from "react";
interface Refetch {
  refetch: () => void;
}

export function CreateCategoryDialog({ refetch }: Refetch) {
  const [open, setOpen] = useState(false);
  const { createCategory, isLoading } = useCreateCategory();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ValidationSchema>) => {
    await createCategory({ name: values.name });
    refetch();
    setOpen(false);
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Category</Button>
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
