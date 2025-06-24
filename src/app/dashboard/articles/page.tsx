"use client";
import AutoComplete from "@/components/AutoComplete";
import PaginationControls from "@/components/Pagination";
import TableArticles from "@/components/TableArticle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";
import useGetArticleList from "@/hooks/api/articles/useGetArticles";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { useAppSelector } from "@/redux/hooks";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const page = () => {
  const { username, id } = useAppSelector((state) => state.user);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: articles,
    isLoading,
    meta,
    refetch,
  } = useGetArticleList({
    search,
    categoryId,
    page,
    take: 9,
  });

  const { data: categories } = useGetCategories({
    page,
    take: 9,
  });

  const handleSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
  };

  return (
    <div className="bg-gray-100 flex flex-col w-full gap-6">
      <div className="flex justify-between w-full px-6 pt-5 pb-4 bg-white">
        <div className="text-xl font-semibold">article</div>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-6">
        <div className="p-6 bg-white border-b-[1px]">
          Total Articles : {meta?.total}
        </div>
        <div className="p-6 bg-white border-b-[1px] flex justify-between content-center">
          <div className=" flex gap-2 rounded-[12px]">
            <Select
              name="outlet"
              onValueChange={handleCategoryChange}
              defaultValue="all"
            >
              <SelectTrigger className="w-[109px] h-[36px] bg-white text-black">
                <SelectValue placeholder={"Select category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories
                  .filter((cat) => !!cat.id)
                  .map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <AutoComplete />
          </div>
          <Button
            onClick={() => router.push("/dashboard/articles/create")}
            size={"lg"}
          >
            Add Article
          </Button>{" "}
        </div>
        <Table className="bg-white rounded-xl border border-slate-200">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="font-bold text-black w-[225px]">
                Thumbnail
              </TableHead>
              <TableHead className="font-bold text-black w-[225px]">
                Title
              </TableHead>
              <TableHead className="font-bold text-black w-[225px]">
                Category
              </TableHead>
              <TableHead className="font-bold text-black w-[225px]">
                Created at
              </TableHead>
              <TableHead className="font-bold text-black w-[225px]">
                Action
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => {
              return (
                <TableArticles
                  id={article.id}
                  key={index}
                  title={article.title}
                  category={article.category.name}
                  createdAt={article.createdAt}
                  imageUrl={article.imageUrl}
                  refetch={refetch}
                />
              );
            })}
          </TableBody>
          {meta && (
            <div className="mx-auto justify-center">
              <PaginationControls
                currentPage={page}
                totalPages={meta.pageCount}
                onPageChange={setPage}
              />
            </div>
          )}
        </Table>
      </div>
    </div>
  );
};

export default AdminAuthGuard(page);
