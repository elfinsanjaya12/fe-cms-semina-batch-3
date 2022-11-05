import { Route, Routes } from 'react-router-dom';

import Categories from '../pages/Categories';
import Create from '../pages/Categories/create';
import Edit from '../pages/Categories/edit';

export function CategoriesRoute() {
  return (
    <Routes>
      <Route path='/' element={<Categories />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:id' element={<Edit />} />
    </Routes>
  );
}
