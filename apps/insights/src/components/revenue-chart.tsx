import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { TimeSeriesData } from '@/types';
import { formatYAxis } from '@/utils/chart';

type RevenueChartProps = {
  data: TimeSeriesData[];
};

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-(--color-background-elevated) p-6">
      <h3 className="mb-4 text-xl font-bold">Revenue Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" tickMargin={20} tick={{ fill: '#999', fontSize: 13 }} />
          <YAxis tick={{ fill: '#999', fontSize: 13 }} tickFormatter={formatYAxis} />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'revenue') {
                return formatYAxis(value as number);
              }
              return value;
            }}
            contentStyle={{
              backgroundColor: '#191a1c',
              border: '1px solid #333',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="revenue" stroke="#f82f62" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
