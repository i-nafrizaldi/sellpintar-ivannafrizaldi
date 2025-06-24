"use client";

import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    const { username } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (!username && !isLoading) {
        redirect("/login");
      }
    }, [username, isLoading]);

    if (isLoading || !username) {
      return (
        <div className="flex flex-col px-6 h-screen place-content-center items-center gap-4">
          loading
        </div>
      );
    }

    return <Component {...props} />;
  };
}
