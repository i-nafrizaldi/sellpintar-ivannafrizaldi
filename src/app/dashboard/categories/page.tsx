"use client";
import PaginationControls from "@/components/Pagination";
import TableCategories from "@/components/TableCategory";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { debounce } from "lodash";
import { useRef, useState } from "react";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: categories,
    meta,
    refetch,
  } = useGetCategories({
    search,
    page,
    take: 9,
  });

  const handleSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  return (
    <div className="bg-gray-100 flex flex-col w-full gap-6">
      <div className="flex justify-between w-full px-6 pt-5 pb-4 bg-white">
        <div className="text-xl font-semibold">category</div>
        <div>profile</div>
      </div>
      <div className="px-6">
        <div className="p-6 bg-white border-b-[1px]">
          Total Category : {meta?.total}
        </div>
        <div className="p-6 bg-white border-b-[1px] flex justify-between content-center">
          <div className=" flex gap-2 rounded-[12px]">
            <Input
              ref={inputRef}
              className="bg-white w-[240px] h-[36px]"
              placeholder="Search Category"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <CreateCategoryDialog refetch={refetch} />
        </div>
        <Table className="bg-white rounded-xl border border-slate-200">
          <TableHeader className="bg-gray-100">
            <TableRow>
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
            {categories.map((category, index) => {
              return (
                <TableCategories
                  category={category.name}
                  id={category.id}
                  key={index}
                  createdAt={category.createdAt}
                  refetch={refetch}
                />
              );
            })}
          </TableBody>
          {meta && (
            <PaginationControls
              currentPage={meta.page}
              totalPages={meta.pageCount}
              onPageChange={setPage}
            />
          )}
        </Table>
      </div>
    </div>
  );
};

export default AdminAuthGuard(page);
