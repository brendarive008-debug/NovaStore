import React, { useState, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Inicio from './pages/Home/Inicio';
import Productos from './pages/Catalogo/Productos';
import CartModal from './components/CartModal/CartModal';

export default function App() {

  const [activeTab, setActiveTab] = useState('inicio');

  // Referencia para controlar el CartModal
  const cartModalRef = useRef(null);

  return (
    <CartProvider>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#fff'
        }}
      >

        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div style={{ flex: 1 }}>

          {activeTab === 'inicio' && (
            <Inicio />
          )}

          {activeTab === 'catalogo' && (
            <Productos />
          )}

          {activeTab === 'informacion' && (

            <div
              style={{
                padding: '4rem 2rem',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'left'
              }}
            >

              <h2
                style={{
                  color: '#721111',
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}
              >
                Acerca de NovaStore
              </h2>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#444',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}
              >
                NovaStore es tu tienda de confianza en
                tecnología, dispositivos y accesorios de
                alta calidad. Nos dedicamos a ofrecerte
                las mejores ofertas y la selección más
                exclusiva del mercado con envíos seguros.
              </p>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#444',
                  lineHeight: '1.6'
                }}
              >
                Explora nuestro catálogo para descubrir
                los mejores smartphones, laptops, audio y
                tecnología de vanguardia adaptada a tus
                necesidades.
              </p>

            </div>

          )}

        </div>

        <CartModal ref={cartModalRef} />

      </div>

    </CartProvider>
  );
}