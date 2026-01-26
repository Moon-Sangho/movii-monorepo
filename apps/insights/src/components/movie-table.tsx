import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';

import Button from '@/components/button';
import { MovieTableData } from '@/types';
import { columns } from '@/utils/movie-table';

type MovieTableProps = {
  data: MovieTableData[];
  totalPages: number;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

const MovieTable = ({
  data,
  totalPages,
  currentPage,
  onPreviousPage,
  onNextPage,
}: MovieTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-(--color-background-elevated)">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="cursor-pointer px-6 py-4 text-left text-sm font-semibold hover:bg-gray-800"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <span className="inline-block">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="ml-2 inline-block w-4">
                        {
                          {
                            asc: '🔼',
                            desc: '🔽',
                          }[header.column.getIsSorted() as string]
                        }
                      </span>
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-800 hover:bg-gray-900">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-800 px-6 py-4">
        <div className="flex gap-2">
          <Button onClick={onPreviousPage} disabled={currentPage === 1} variant="secondary">
            Previous
          </Button>
          <Button onClick={onNextPage} disabled={currentPage >= totalPages} variant="secondary">
            Next
          </Button>
        </div>
        <span className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default MovieTable;
