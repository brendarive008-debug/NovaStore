import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Productos.module.css';

export default function Productos() {
  const { state, addToCart, setFilterOffers } = useCart();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productosAMostrar = state.filterOfferOnly
    ? state.products.filter(p => p.isOffer)
    : state.products;

  return (
    <div className={styles.catalogoContainer}>
      <div className={styles.headerCatalogo}>
        <div>
          <h2 className={styles.tituloSec}>
            {state.filterOfferOnly ? '🔥 Ofertas Destacadas' : 'Catálogo General de Productos'}
          </h2>
          <p className={styles.subTituloSec}>Mostrando {productosAMostrar.length} productos disponibles</p>
        </div>
        
        <button
  onClick={() =>
    setFilterOffers(!state.filterOfferOnly)
  }
  className={styles.filtroBtn}
>
  {state.filterOfferOnly
    ? '✨ Ver Todos los Productos'
    : '🔥 Ver solo las 10 Ofertas'}
</button>
      </div>

      <div className={styles.gridCatalogo}>
        {productosAMostrar.map((prod) => (
          <div key={prod.id} className={styles.cardProd}>
            {prod.isOffer && (
              <span className={styles.badgeOfertaCard}>
                -{prod.discountPercent}%
              </span>
            )}

            {/* Imagen clickeable para abrir el modal */}
            <div 
              className={styles.imgBox} 
              onClick={() => setProductoSeleccionado(prod)}
              style={{ cursor: 'pointer' }}
              title="Haz clic para ver detalles"
            >
              <img 
                src={prod.image || 'https://via.placeholder.com/300?text=NovaStore'} 
                alt={prod.name} 
                className={styles.imgProd} 
              />
            </div>

            <div className={styles.infoBox}>
              <h3 className={styles.nombreProd}>{prod.name}</h3>
              <p className={styles.descProd}>{prod.description}</p>
              
              <div className={styles.precioBox}>
                {prod.isOffer && (
                  <span className={styles.precioOld}>${prod.oldPrice.toFixed(2)}</span>
                )}
                <span className={styles.precioFinal}>${prod.price.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => addToCart(prod)}
              className={styles.agregarBtn}
            >
              🛒 Agregar al Carrito
            </button>
          </div>
        ))}
      </div>

      {/* Ventana Modal de Detalles */}
      {productoSeleccionado && (
        <div className={styles.modalOverlay} onClick={() => setProductoSeleccionado(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setProductoSeleccionado(null)}>×</button>
            
            {productoSeleccionado.isOffer && (
              <span className={styles.modalBadge}>-{productoSeleccionado.discountPercent}% Descuento</span>
            )}

            <div className={styles.modalImgBox}>
              <img src={productoSeleccionado.image} alt={productoSeleccionado.name} />
            </div>

            <h3 className={styles.modalTitle}>{productoSeleccionado.name}</h3>
            <p className={styles.modalDescFull}>{productoSeleccionado.description}</p>
            
            <div className={styles.modalPriceBox}>
              {productoSeleccionado.isOffer && (
                <span className={styles.precioOld}>${productoSeleccionado.oldPrice.toFixed(2)}</span>
              )}
              <span className={styles.precioFinal}>${productoSeleccionado.price.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => {
                addToCart(productoSeleccionado);
                setProductoSeleccionado(null);
              }}
              className={styles.agregarBtnModal}
            >
              🛒 Agregar al Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}