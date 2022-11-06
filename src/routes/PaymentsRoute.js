import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/Payments';
import Create from '../pages/Payments/create';
import Edit from '../pages/Payments/edit';

export function PaymentsRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:id' element={<Edit />} />
    </Routes>
  );
}
