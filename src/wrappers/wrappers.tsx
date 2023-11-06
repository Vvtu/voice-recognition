import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from '@/main-routes/main-routes';

export function Wrappers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter basename="/voice-recognition-build">
      <MainRoutes>{children}</MainRoutes>
    </BrowserRouter>
  );
}
