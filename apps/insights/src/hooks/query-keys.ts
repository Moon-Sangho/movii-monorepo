export const queryKeys = {
  movieTable: {
    all: ['movie-table'] as const,
    list: (page: number, filters: Record<string, string | number>) =>
      [...queryKeys.movieTable.all, 'list', { page, ...filters }] as const,
  },
  genres: {
    all: ['genres'] as const,
    list: () => [...queryKeys.genres.all, 'list'] as const,
  },
};
