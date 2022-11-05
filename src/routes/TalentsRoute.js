import { Route, Routes } from 'react-router-dom';

import Talents from '../pages/Talents';
import Create from '../pages/Talents/create';
import Edit from '../pages/Talents/edit';

export function TalentsRoute() {
  return (
    <Routes>
      <Route path='/' element={<Talents />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:id' element={<Edit />} />
    </Routes>
  );
}
