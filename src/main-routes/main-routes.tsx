import { Route, Routes } from 'react-router-dom';

export function MainRoutes({ children }: { children: React.ReactNode }) {
  return (
    <Routes>
      <Route path="/" element={children} />
      <Route path="about" element={<div>About app: ... </div>} />
      <Route path="*" element={<div>NoMatch</div>} />
    </Routes>
  );
}
