"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { LogOut, Newspaper, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    router.push("/login");
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  return (
    <div className="py-6 px-4 text-white bg-blue-600 min-h-screen">
      <div className="flex flex-col gap-6">
        LOGO
        <div className="flex flex-col gap-2 font-bold">
          <Link href="/dashboard/articles">
            <div
              className={`h-10 items-center cursor-pointer rounded-md px-6 flex gap-4 hover:bg-blue-500 ${
                pathname.startsWith("/dashboard/articles") ? "bg-blue-500" : ""
              }`}
            >
              <Newspaper />
              Articles
            </div>
          </Link>

          <Link href="/dashboard/categories">
            <div
              className={`h-10 items-center cursor-pointer rounded-md px-6 flex gap-4 hover:bg-blue-500 ${
                pathname.startsWith("/dashboard/categories")
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              <Tag />
              Categories
            </div>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="h-10 items-center cursor-pointer rounded-md px-6 flex gap-4 hover:bg-blue-500">
                <LogOut />
                Logout
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-600 text-white"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
