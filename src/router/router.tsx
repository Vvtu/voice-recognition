import { createBrowserRouter } from 'react-router-dom';

export function router({ children }: { children: React.ReactNode }) {
  return createBrowserRouter([
    {
      path: '/',
      element: children,
    },
    {
      path: 'about',
      element: <div>About app: ... </div>,
    },
    {
      path: '*',
      element: <div>NoMatch</div>,
    },
  ]);
}
