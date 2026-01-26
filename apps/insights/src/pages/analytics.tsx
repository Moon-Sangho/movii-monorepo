import { Suspense } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import RevenueChart from '@/components/revenue-chart';
import Spinner from '@/components/spinner';
import { useGenresQuery } from '@/hooks/use-genres-query';
import { formatYAxis } from '@/utils/chart';
import { generateMovieMetrics, generateTimeSeriesData } from '@/utils/simulation';

const COLORS = [
  '#f82f62',
  '#3da7ff',
  '#0aca9e',
  '#fbc02d',
  '#e73e3e',
  '#00d4ff',
  '#ff6b9d',
  '#c44569',
  '#f8b500',
  '#6bcf7f',
];

const AnalyticsContent = () => {
  const { data: genres } = useGenresQuery();
  const timeSeriesData = generateTimeSeriesData(90);

  // Generate genre data based on actual genres and limit to top 10
  const genreData = genres
    .map((genre: { id: number; name: string }) => {
      const { revenue } = generateMovieMetrics(genre.id);
      return {
        name: genre.name,
        revenue,
      };
    })
    .sort((a: { revenue: number }, b: { revenue: number }) => b.revenue - a.revenue)
    .slice(0, 7);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-800 bg-(--color-background-elevated) p-6">
          <h3 className="mb-4 text-xl font-bold">Top 7 Genre Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {genreData.map((_: { name: string; revenue: number }, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatYAxis(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-gray-800 bg-(--color-background-elevated) p-6">
          <h3 className="mb-4 text-xl font-bold">Top 7 Genres by Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" tickFormatter={formatYAxis} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: '#191a1c',
                  border: '1px solid #333',
                }}
                formatter={(value, name) => {
                  if (name === 'revenue') {
                    return formatYAxis(value as number);
                  }
                  return value;
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#f82f62" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <RevenueChart data={timeSeriesData} />
    </div>
  );
};

const AnalyticsPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <AnalyticsContent />
    </Suspense>
  );
};

export default AnalyticsPage;
