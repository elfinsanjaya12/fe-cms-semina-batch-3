import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Home';

export function HomeRoute() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
    </Routes>
  );
}
