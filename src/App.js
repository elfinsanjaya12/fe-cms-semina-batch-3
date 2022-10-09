import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CategoriesPage from './pages/Categories';
import CategoriesCreatePage from './pages/Categories/create';
import CategoriesEditPage from './pages/Categories/edit';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='categories' element={<CategoriesPage />} />
        <Route path='categories/create' element={<CategoriesCreatePage />} />
        <Route path='categories/edit/:id' element={<CategoriesEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
