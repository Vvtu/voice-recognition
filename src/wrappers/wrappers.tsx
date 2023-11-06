import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { MainRoutes } from '@/main-routes/main-routes';

const MAX_STALE_TIME = 3000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: false,
      retryDelay: 1000,
      staleTime: MAX_STALE_TIME,
      refetchOnWindowFocus: false, // default: true
      // refetchOnMount: false,
      // refetchOnWindowFocus: true,
      // refetchOnReconnect: false,
      // refetchInterval: 2000,
      // notifyOnChangeProps: "tracked",
    },
  },
});

export function Wrappers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/voice-recognition-build">
        <MainRoutes>{children}</MainRoutes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
