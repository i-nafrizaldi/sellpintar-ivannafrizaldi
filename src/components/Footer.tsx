"use client";
import { useAppSelector } from "@/redux/hooks";

const Footer = () => {
  const { username } = useAppSelector((state) => state.user);
  if (!username) return null;
  return (
    <div className="bg-blue-600/[86%]  text-white items-center flex flex-col md:flex-row justify-center h-[100px] gap-2.5 px-12">
      <div className="font-bold">footer</div>
      <div>Ⓒ 2025 Blog genzet. All right reserved.</div>
    </div>
  );
};

export default Footer;
