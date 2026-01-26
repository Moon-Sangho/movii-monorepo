import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

import MovieTable from '@/components/movie-table';
import Spinner from '@/components/spinner';
import { useGenresQuery } from '@/hooks/use-genres-query';
import { useMoviesQuery } from '@/hooks/use-movies-query';

const MoviesContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // Load genres first (cached after first load)
  const { data: genres } = useGenresQuery();

  // Load movies with genres
  const { data } = useMoviesQuery({ page, genres });

  const handlePreviousPage = () => {
    setSearchParams({ page: Math.max(1, page - 1).toString() });
  };

  const handleNextPage = () => {
    if (page < data.totalPages) {
      setSearchParams({ page: (page + 1).toString() });
    }
  };

  return (
    <MovieTable
      data={data.movies}
      totalPages={data.totalPages}
      currentPage={page}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
    />
  );
};

const MoviesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Movies Database</h1>
      <Suspense fallback={<Spinner />}>
        <MoviesContent />
      </Suspense>
    </div>
  );
};

export default MoviesPage;
