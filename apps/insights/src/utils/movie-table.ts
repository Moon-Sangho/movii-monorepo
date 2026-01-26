import { createColumnHelper } from '@tanstack/react-table';

import { MovieTableData } from '@/types';

const columnHelper = createColumnHelper<MovieTableData>();

export const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('releaseDate', {
    header: 'Release Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    cell: (info) => `${info.getValue().toFixed(1)} ⭐`,
  }),
  columnHelper.accessor('revenue', {
    header: 'Revenue',
    cell: (info) => `$${(info.getValue() / 1_000_000).toFixed(1)}M`,
  }),
  columnHelper.accessor('genre', {
    header: 'Genre',
    cell: (info) => info.getValue(),
  }),
];
