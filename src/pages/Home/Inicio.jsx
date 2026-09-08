// src/pages/Inicio/Inicio.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Inicio.module.css';

export default function Inicio({ setActiveTab }) {
  const { state, addToCart, setSelectedProduct } = useCart();

  // Filtrar solo las 10 ofertas para mostrar en el inicio
  const ofertasInicio = state.products.filter(p => p.isOffer).slice(0, 10);

  return (
    <div className={styles.inicioContainer}>
      {/* BANNER PRINCIPAL CON FONDO OPACO / ATENUADO */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>✨ Tecnología e Innovación</div>
            <h1 className={styles.heroTitle}>Bienvenido a <span>NovaStore</span></h1>
            <p className={styles.heroSubtitle}>
              Descubre nuestra exclusiva selección de dispositivos y accesorios con calidad garantizada. Aprovecha las mejores ofertas del momento.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn} onClick={() => { setActiveTab('catalogo'); }}>
                Ver Catálogo Completo 🚀
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN EXCLUSIVA DE OFERTAS EN EL INICIO */}
      <section className={styles.ofertasSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🔥 Ofertas Destacadas</h2>
          <p className={styles.sectionSub}>Aprovecha descuentos exclusivos por tiempo limitado</p>
        </div>

        <div className={styles.grid}>
          {ofertasInicio.map((prod) => (
            <div key={prod.id} className={styles.cardOffer}>
              <span className={styles.badgeOffer}>-{prod.discountPercent}%</span>

              <div className={styles.imgContainer}>
                <img 
                  src={prod.image || 'https://via.placeholder.com/300?text=NovaStore'} 
                  alt={prod.name} 
                  className={styles.productImg} 
                />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.productTitle}>{prod.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.oldPriceSmall}>${prod.oldPrice.toFixed(2)}</span>
                  <span className={styles.price}>${prod.price.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.infoBtn} onClick={() => setSelectedProduct(prod.id)}>
                  Detalles
                </button>
                <button className={styles.addBtn} onClick={() => addToCart(prod)}>
                  + Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}