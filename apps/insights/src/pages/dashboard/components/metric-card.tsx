type MetricCardProps = {
  title: string;
  value: string | number;
  change?: string;
  icon?: string;
};

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-(--color-background-elevated) p-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm text-gray-400">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      {change && <p className="mt-2 text-sm text-green-500">{change}</p>}
    </div>
  );
};

export default MetricCard;
