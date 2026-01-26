import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { queryKeys } from './query-keys';
import { GenreData } from './use-genres-query';

import { MovieTableData } from '@/types';
import { api } from '@/utils/api';
import { enrichMovieData } from '@/utils/simulation';

type MoviesResponse = {
  results: {
    id: number;
    title: string;
    releaseDate: string;
    voteAverage: number;
    genreIds: number[];
  }[];
  page: number;
  totalPages: number;
};

export type MoviesData = {
  movies: MovieTableData[];
  totalPages: number;
};

type UseMoviesQueryParams = {
  page: number;
  genres: GenreData[];
};

export const useMoviesQuery = ({ page, genres }: UseMoviesQueryParams) => {
  // Create fetch function with genres from parameter
  const fetchMovies = useCallback(async (): Promise<MoviesData> => {
    // Create genre map from passed genre data
    const genreMap = new Map(genres.map((g) => [g.id, g.name]));

    const response = await api.get<MoviesResponse>('/3/movie/popular', {
      params: { page, language: 'ko' },
    });

    // Convert genreIds to genre names
    const moviesWithGenres = response.data.results.map((movie) => ({
      ...movie,
      genres: movie.genreIds
        .map((id) => genreMap.get(id))
        .filter(Boolean)
        .map((name) => ({ name: name as string })),
    }));

    return {
      movies: enrichMovieData(moviesWithGenres),
      totalPages: response.data.totalPages,
    };
  }, [genres, page]);

  return useSuspenseQuery({
    queryKey: queryKeys.movieTable.list(page, {}),
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
