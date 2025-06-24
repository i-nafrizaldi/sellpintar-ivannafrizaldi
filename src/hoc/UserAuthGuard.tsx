"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import logo1 from "../../public/Black Friday Typography Instagram Post.png";

export default function UserAuthGuard(Component: any) {
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
        } else if (role !== "User") {
          toast.error("You don't have permission to access this page.");
          redirect("/Dashboard");
        }
      }
    }, [id, role, isLoading]);

    if (isLoading || !id) {
      return (
        <div className="flex flex-col px-6 h-screen place-content-center items-center gap-4">
          <div className="animate-pulse">
            <Image alt="logo" src={logo1} />
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
