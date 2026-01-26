import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from './query-keys';
import { api } from '@/utils/api';

export type GenreData = {
  id: number;
  name: string;
};

type GenresResponse = {
  genres: GenreData[];
};

const fetchGenres = async (): Promise<GenreData[]> => {
  const response = await api.get<GenresResponse>('/3/genre/movie/list', {
    params: { language: 'ko' },
  });
  return response.data.genres;
};

const genresQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.genres.list(),
    queryFn: fetchGenres,
    staleTime: Infinity,
    gcTime: Infinity,
  });

export const useGenresQuery = () => {
  return useSuspenseQuery(genresQueryOptions());
};

export const getGenresQueryOptions = () => genresQueryOptions();
