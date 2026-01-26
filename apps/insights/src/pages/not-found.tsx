import { Link } from 'react-router';

import Button from '@/components/button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-96">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-gray-400">Page not found</p>
      <Link to="/dashboard">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
