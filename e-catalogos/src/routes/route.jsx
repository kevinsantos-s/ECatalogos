import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Compra } from '../pages/compra/compra.jsx';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Compra/>} />
    </Routes>
  </BrowserRouter>
);

