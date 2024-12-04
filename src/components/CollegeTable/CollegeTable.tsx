'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';

type College = {
  id: string;
  name: string;
  location: string;
  type: string;
  minScore: number;
  maxScore: number;
  programs: string[];
};

const columnHelper = createColumnHelper<College>();

export default function CollegeTable() {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: '学校名称',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('location', {
        header: '所在地',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('type', {
        header: '类型',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('minScore', {
        header: '最低分',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('maxScore', {
        header: '最高分',
        cell: info => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        header: '操作',
        cell: props => (
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
    // TODO: 实现添加收藏功能
  };

  // 模拟数据，实际应该从API获取
  const data = useMemo(() => [], []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="搜索..."
        className="p-2 border rounded w-full max-w-md"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
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
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map(cell => (
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