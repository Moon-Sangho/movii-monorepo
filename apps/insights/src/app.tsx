import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import TanstackQueryDevtools from '@/add-ons/tanstack-query-devtools';
import Router from '@/router';

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {import.meta.env.DEV && <TanstackQueryDevtools />}
    </QueryClientProvider>
  );
}
