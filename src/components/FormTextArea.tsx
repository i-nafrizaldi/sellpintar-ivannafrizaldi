"use client";

import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  form: any;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  form,
  label,
  name,
  placeholder,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="h-[450px] w-full bg-white"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
