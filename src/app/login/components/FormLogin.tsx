/* eslint-disable react/no-unescaped-entities */
"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLogin from "@/hooks/api/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidationSchema } from "../validationSchema";

export function FromLogin() {
  const { login, isLoading } = useLogin();
  const [schema, setSchema] = useState(ValidationSchema);

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    login(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white w-[343px] py-6 px-2.5 flex flex-col justify-center gap-6 rounded-[24px]"
      >
        <div className="mx-auto">
          <Image
            src="/Logoipsum.png"
            alt={""}
            width={800}
            height={400}
            className="w-[134px] h-6  object-cover rounded-xl "
          />
        </div>
        <FormInput
          name="username"
          type="username"
          label="Username"
          placeholder="Input username"
          form={form}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Entry Password"
          form={form}
        />

        <Button type="submit" className="bg-blue-600" disabled={isLoading}>
          {isLoading ? <Loader2 className=" animate-spin" /> : "Submit"}
          {isLoading ?? "Login Success !"}
        </Button>

        <div className="mx-auto font-light">
          Don't have an account?{" "}
          <Link href={`/register`} className="text-blue-600 underline ">
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
}
