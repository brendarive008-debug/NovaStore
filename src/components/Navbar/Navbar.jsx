// src/components/Navbar/Navbar.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';
import logoNova from '../../assets/log1..jpg';

export default function Navbar({ activeTab, setActiveTab }) {
  const {
  state,
  toggleCart,
  setFilterOffers,
  clearNotification,
  toggleHistory,
  closeHistory
} = useCart();

  const totalItems = state.cart
    ? state.cart.reduce(
        (acc, item) => acc + item.quantity,
        0
      )
    : 0;

  const handleBrandClick = () => {
    setFilterOffers(false);
    setActiveTab('inicio');
  };

  return (
    <nav className={styles.navbar}>

      {/* BRAND Y LOGO */}
      <div
        className={styles.brand}
        onClick={handleBrandClick}
      >
        <div className={styles.logoCircle}>
          <img
            src={logoNova}
            alt="NovaStore Logo"
            className={styles.logoImg}
          />
        </div>

        <h1 className={styles.titleGame}>
          NovaStore
        </h1>
      </div>

      {/* NAVEGACIÓN CENTRAL */}
      <div className={styles.navLinks}>

        <button
          onClick={() => {
            setFilterOffers(false);
            setActiveTab('inicio');
          }}
          className={
            activeTab === 'inicio'
              ? styles.navBtnActive
              : styles.navBtn
          }
        >
          Inicio
        </button>

        <button
          onClick={() => {
            setFilterOffers(false);
            setActiveTab('catalogo');
          }}
          className={
            activeTab === 'catalogo'
              ? styles.navBtnActive
              : styles.navBtn
          }
        >
          Catálogo
        </button>

        {/* CARRITO */}
        <button
          className={styles.cartBtn}
          onClick={toggleCart}
        >
          🛒 Carrito
          <span className={styles.badge}>
            {totalItems}
          </span>
        </button>

        {/* HISTORIAL */}
        <button
          className={styles.historyBtn}
          onClick={toggleHistory}
        >
          📋 Historial
        </button>
      </div>

      {/* MENSAJE DE PRODUCTO AGREGADO */}
      {state.notification && (
        <div
          className={
            state.notification.type === 'error'
              ? `${styles.notification} ${styles.notificationError}`
              : styles.notification
          }
        >
          <p>{state.notification.message}</p>

          <div className={styles.notificationButtons}>

            <button
              onClick={() => {
                clearNotification();

                if (!state.isCartOpen) {
                  toggleCart();
                }
              }}
            >
              Ir al carrito
            </button>

            <button
              onClick={clearNotification}
            >
              Seguir comprando
            </button>

          </div>
        </div>
      )}

      {state.isHistoryOpen && (
  <div
    className={styles.historyOverlay}
    onClick={closeHistory}
  >
    <div
      className={styles.historyModal}
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className={styles.historyClose}
        onClick={closeHistory}
      >
        ✕
      </button>

      <h2>Historial de Compras</h2>

      {state.purchaseHistory.length === 0 ? (
        <p className={styles.noHistory}>
          Aún no hay compras registradas.
        </p>
      ) : (
        <div>
          {state.purchaseHistory.map((purchase) => (
            <div
              key={purchase.id}
              className={styles.historyItem}
            >
              <strong>{purchase.customer}</strong>

              <p>
                Fecha: {purchase.date}
              </p>

              <p>
                Pago: {purchase.paymentMethod}
              </p>

              <p>
                Total: ${purchase.total.toFixed(2)}
              </p>

              <div className={styles.historyProducts}>
                {purchase.items.map((item) => (
                  <span key={item.id}>
                    {item.name} x{item.quantity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOTÓN PARA CERRAR */}
      <button
        className={styles.historyCloseButton}
        onClick={closeHistory}
      >
        Cerrar
      </button>

    </div>
  </div>
      )}
    </nav>
  );
}