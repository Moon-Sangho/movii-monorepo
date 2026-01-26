import RevenueChart from '@/components/revenue-chart';
import DashboardOverview from '@/pages/dashboard/components/dashboard-overview';
import { generateTimeSeriesData } from '@/utils/simulation';

const DashboardPage = () => {
  const timeSeriesData = generateTimeSeriesData(30);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <DashboardOverview />
      <RevenueChart data={timeSeriesData} />
    </div>
  );
};

export default DashboardPage;
