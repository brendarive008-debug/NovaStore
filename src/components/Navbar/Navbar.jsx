// src/components/Navbar/Navbar.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';
import logoNova from '../../assets/log1..jpg';

export default function Navbar({ activeTab, setActiveTab }) {
  const { state, toggleCart, setFilterOffers } = useCart();

  const totalItems = state.cart ? state.cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const handleBrandClick = () => {
    setFilterOffers(false);
    setActiveTab('inicio');
  };

  return (
    <nav className={styles.navbar}>
      {/* BRAND Y LOGO */}
      <div className={styles.brand} onClick={handleBrandClick}>
        <div className={styles.logoCircle}>
          <img src={logoNova} alt="NovaStore Logo" className={styles.logoImg} />
        </div>
        <h1 className={styles.titleGame}>NovaStore</h1>
      </div>
      
      {/* NAVEGACIÓN CENTRAL */}
      <div className={styles.navLinks}>
        <button 
          onClick={() => { setFilterOffers(false); setActiveTab('inicio'); }}
          className={activeTab === 'inicio' ? styles.navBtnActive : styles.navBtn}
        >
          Inicio
        </button>
        
        <button 
          onClick={() => { setFilterOffers(false); setActiveTab('catalogo'); }}
          className={activeTab === 'catalogo' ? styles.navBtnActive : styles.navBtn}
        >
          Catálogo
        </button>

        {/* CARRITO */}
        <button className={styles.cartBtn} onClick={toggleCart}>
          🛒 Carrito <span className={styles.badge}>{totalItems}</span>
        </button>
      </div>
    </nav>
  );
}




