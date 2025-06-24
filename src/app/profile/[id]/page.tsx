"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id, role, username } = useAppSelector((state) => state.user);
  const router = useRouter();
  return (
    <div className="container md:h-[880px] h-[768px] place-content-center">
      <div className="flex flex-col gap-9 py-6 px-4 w-[335px] mx-auto md:w-[400px]">
        <p className="mx-auto font-bold text-xl">User Profile</p>
        <Avatar className="w-[68px] h-[68px] mx-auto">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className=" bg-gray-100 px-3 py-2.5 rounded-[6px] justify-between flex">
              <div className="flex gap-4">
                <p className="w-[75px] font-bold">Username</p>
              </div>
              <div className="text-center w-[210px]">{username}</div>
            </div>

            <div className=" bg-gray-100 px-3 py-2.5 rounded-[6px] justify-between flex">
              <div className="flex gap-4">
                <p className="w-[75px] font-bold">Password</p>
                <p>:</p>
              </div>
              <div className="text-center w-[210px]">James Dean</div>
            </div>

            <div className=" bg-gray-100 px-3 py-2.5 rounded-[6px] justify-between flex">
              <div className="flex gap-4">
                <p className="w-[75px] font-bold">Role</p>
                <p>:</p>
              </div>
              <div className="text-center w-[210px]">{role}</div>
            </div>
          </div>
        </div>
        <Button onClick={() => router.push("/")}>Back to home</Button>
      </div>
    </div>
  );
};

export default page;
