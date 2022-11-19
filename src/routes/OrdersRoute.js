import { Route, Routes } from 'react-router-dom';

import Orders from '../pages/Orders';

export function OrdersRoute() {
  return (
    <Routes>
      <Route path='/' element={<Orders />} />
    </Routes>
  );
}
