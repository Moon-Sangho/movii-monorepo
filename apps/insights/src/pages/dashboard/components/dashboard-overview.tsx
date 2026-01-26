import { Suspense } from 'react';

import MetricCard from './metric-card';

import Spinner from '@/components/spinner';

const DashboardOverview = () => {
  const metrics = [
    {
      title: 'Total Movies',
      value: '1,234',
      change: '+12% from last month',
      icon: '🎬',
    },
    {
      title: 'Avg Rating',
      value: '7.2',
      change: '+0.3 from last month',
      icon: '⭐',
    },
    {
      title: 'Total Revenue',
      value: '$12.5B',
      change: '+8% from last month',
      icon: '💰',
    },
    {
      title: 'Total Views',
      value: '45.2M',
      change: '+15% from last month',
      icon: '👁️',
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </Suspense>
  );
};

export default DashboardOverview;
