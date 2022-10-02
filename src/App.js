import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/About';
import HomePage from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='about' element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
