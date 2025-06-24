"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import LogoutDialog from "./LogoutDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import logo from "../../public/Logoipsum.png";

const Navbar = () => {
  const { username, id } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (!username) return null;

  return (
    <div className="bg-white md:bg-none sticky top-0 flex justify-between h-16 px-5 py-4 shadow-sm z-50">
      <div>
        {" "}
        <Image
          onClick={() => router.push("/")}
          src="/Logoipsum.png"
          alt={""}
          width={800}
          height={400}
          className="w-[134px] h-6  object-cover rounded-xl cursor-pointer"
        />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm font-bold ">{username}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/profile/${id}`)}>
              Profile
            </DropdownMenuItem>

            <LogoutDialog />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
