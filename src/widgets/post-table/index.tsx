'use client';
import React, { Key } from "react";
import { useRouter, usePathname } from 'next/navigation'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";
import { IPost } from '@/services/notion/types'
interface IPostTable {
  posts: IPost[],
}
export default function PostTable({ posts }: IPostTable) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const router = useRouter()
  const pathName = usePathname()

  const pages = Math.ceil(posts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return posts.slice(start, end);
  }, [page, posts]);

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
  const openBlog = (blogId: string) => {
    router.push(`${pathName}/${blogId}`)
  }
  return (
    <Table
      classNames={classNames}
      hideHeader
      removeWrapper
      selectionMode="single"
      bottomContent={
        pages > 1 &&
        <div className="flex w-full">
          <Pagination
            variant="light"
            page={page}
            total={pages}
            classNames={{
              prev: "bg-transparent text-default font-bold",
              // item: "w-8 h-8 text-small rounded-none bg-transparent",
              cursor: "bg-transparent font-bold",
            }}
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
