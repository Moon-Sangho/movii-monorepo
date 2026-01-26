import { TimeSeriesData, MovieTableData } from '@/types';

/**
 * Generate simulated revenue and view data for movies
 * Uses movie ID as seed for consistent but varied data
 */
export const generateMovieMetrics = (
  movieId: number,
): { revenue: number; views: number } => {
  const seed = movieId * 12345;
  const revenue =
    Math.floor((Math.sin(seed) * 0.5 + 0.5) * 500_000_000) + 50_000_000;
  const views =
    Math.floor((Math.cos(seed) * 0.5 + 0.5) * 50_000_000) + 5_000_000;

  return { revenue, views };
};

/**
 * Generate time series data for charts
 */
export const generateTimeSeriesData = (days: number): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = Date.now();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const year = String(date.getFullYear() % 100).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    data.push({
      date: `${year}.${month}.${day}`,
      revenue: Math.floor(Math.random() * 50_000_000) + 10_000_000,
      views: Math.floor(Math.random() * 5_000_000) + 1_000_000,
    });
  }

  return data;
};

/**
 * Enhance TMDB movie data with simulated metrics
 */
export const enrichMovieData = (
  movies: {
    id: number;
    title: string;
    releaseDate: string;
    voteAverage: number;
    genres: { name: string }[];
  }[],
): MovieTableData[] => {
  return movies.map((movie) => {
    const { revenue } = generateMovieMetrics(movie.id);
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.releaseDate,
      rating: movie.voteAverage,
      revenue,
      genre: movie.genres[0]?.name || 'Unknown',
    };
  });
};
