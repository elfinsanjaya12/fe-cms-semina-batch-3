import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CategoriesPage from './pages/Categories';
import CategoriesCreatePage from './pages/Categories/create';
import CategoriesEditPage from './pages/Categories/edit';
import TalentsPage from './pages/Talents';
import TalentsCreatePage from './pages/Talents/create';
import TalentsEditPage from './pages/Talents/edit';
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
        <Route path='talents' element={<TalentsPage />} />
        <Route path='talents/create' element={<TalentsCreatePage />} />
        <Route path='talents/edit/:id' element={<TalentsEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
