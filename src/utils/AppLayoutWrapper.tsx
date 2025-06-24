"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isArticleEdit = /^\/articles\/[^/]+\/edit$/.test(pathname);
  const isArticleDetail = /^\/articles\/[^/]+$/.test(pathname);

  const showLayout = !isDashboard && (!isArticleEdit || isArticleDetail);

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
