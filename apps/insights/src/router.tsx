import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Spinner from '@/components/spinner';

const Layout = lazy(() => import('@/components/layout'));
const AnalyticsPage = lazy(() => import('@/pages/analytics'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const MoviesPage = lazy(() => import('@/pages/movies'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
