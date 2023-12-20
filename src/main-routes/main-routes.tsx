import { Route, Routes } from 'react-router-dom';

import { SelectTongueTwister } from '@/pages/select-tongue-twister/select-tongue-twister';

export function MainRoutes({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Routes>
      <Route path="/" element={children} />
      <Route path="select-tongue-twister" element={<SelectTongueTwister />} />
      <Route path="about" element={<div>About app: ... </div>} />
      <Route path="*" element={<div>NoMatch</div>} />
    </Routes>
  );
}
