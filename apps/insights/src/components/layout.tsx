import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import Button from '@/components/button';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-96">
      <p className="text-red-500">Error: {error.message}</p>
      <Button onClick={resetErrorBoundary}>Try Again</Button>
    </div>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-(--color-background)">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default Layout;
