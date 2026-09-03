import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Inicio from './pages/Home/Inicio';
import Productos from './pages/Catalogo/Productos';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Productos />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;