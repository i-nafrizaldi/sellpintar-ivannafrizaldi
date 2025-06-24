"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutDialog = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    router.push("/");
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-destructive flex gap-1">
        <LogOut />
        Logout
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={() => logout()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
