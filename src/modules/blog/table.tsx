'use client';
import React, { Key } from "react";
import { useRouter } from 'next/navigation'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";
import { ITag, IBlog } from '@/services/notion/types'
interface IBlogTable {
  blogs: IBlog[],
}
export default function BlogTable({ blogs }: IBlogTable) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
    const router = useRouter()

  const pages = Math.ceil(blogs.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return blogs.slice(start, end);
  }, [page, blogs]);

  const renderCell = React.useCallback((item: any, columnKey: string | number) => {
    const cellValue = item[columnKey]
    if (columnKey === "name") {
      return (
        <div className="flex items-center">
          <div className="font-medium text-sm">{cellValue}</div>
        </div>
      )
    }
    // if (columnKey === "tags") {
    //   return (
    //     <div className="flex flex-row flex-wrap mb-1 gap-x-3 gap-y-1">
    //       {item.tags?.map(({ name }: { name: string }) => {
    //         return (
    //           <div key={name} className="rounded-sm bg-zinc-200 text-xs opacity-80 py-1 px-2 text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
    //             {name}
    //           </div>
    //         )
    //       })}
    //     </div>
    //   )
    // }
    // if (columnKey === "last_edited_time") {
    //   return <div className="text-sm text-gray-500">{cellValue}</div>;
    // }
    return null;
  }
    , []);

  const classNames = React.useMemo(
    () => ({
      table: ["border-collapse", "min-h-130"],
      // th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    }),
    [],
  );
  const openBlog = (blogId: string) => router.push(`/blog/${blogId}`)
  return (
    <Table
      classNames={classNames}
      hideHeader
      removeWrapper
      selectionMode="single"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            variant="light"
            showControls
            color="default"
            page={page}
            total={pages}
            onChange={(page: any) => setPage(page)}
          />
        </div>
      }
      onRowAction={openBlog}
    >
      <TableHeader>
        <TableColumn key="name">名称</TableColumn>
        {/* <TableColumn key="tags">标签</TableColumn> */}
        <TableColumn key="last_edited_time">最后更新</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id} className="cursor-pointer">
            {(columnKey: string | number) => <TableCell>
              {renderCell(item, columnKey)}
            </TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
