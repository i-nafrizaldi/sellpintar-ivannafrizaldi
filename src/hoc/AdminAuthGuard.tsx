"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminAuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    const { id, role } = useAppSelector((state) => state.user);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (!isLoading) {
        if (!id) {
          toast.error("Please login to continue!");
          redirect("/login");
        } else if (role !== "Admin") {
          toast.error("You don't have permission to access this page.");
          redirect("/");
        }
      }
    }, [id, role, isLoading]);

    return <Component {...props} />;
  };
}
