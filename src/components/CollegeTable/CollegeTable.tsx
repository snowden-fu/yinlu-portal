"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

type College = {
  id: number;
  year: number;
  source_region: string;
};

const columnHelper = createColumnHelper<College>();

export default function CollegeTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, ] = useState<College[]>([]);
  const [loading, ] = useState(false);

  const columns = useMemo(
    () => [
      columnHelper.accessor("year", {
        header: "年份",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("source_region", {
        header: "来源区域",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: "操作",
        cell: (props) => (
          <button
            onClick={() => handleAddFavorite(props.row.original)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            收藏
          </button>
        ),
      }),
    ],
    []
  );

  const handleAddFavorite = async (college: College) => {
    console.log("add "+college)
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="搜索..."
        className="p-2 border rounded w-full max-w-md"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
