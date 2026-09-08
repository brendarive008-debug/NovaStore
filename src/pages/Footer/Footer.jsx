// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ setActiveTab }) {
  return (
    <footer className={styles.footer}>

      <div className={styles.footerContainer}>

        <div className={styles.footerInfo}>
          <h3>NovaStore</h3>

          <p>
            Tu tienda de confianza en tecnología,
            dispositivos y accesorios con calidad garantizada.
          </p>
        </div>

        <div className={styles.footerLinks}>
          <h4>Enlaces Rápidos</h4>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('inicio');
              window.scrollTo(0, 0);
            }}
          >
            Inicio
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('catalogo');
              window.scrollTo(0, 0);
            }}
          >
            Catálogo
          </a>

        </div>

        <div className={styles.footerContact}>
          <h4>Contacto</h4>

          <p>Email:@novastore.com</p>
          <p>Teléfono: +503 7345-1500</p>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} NovaStore.
          Todos los derechos reservados.
        </p>
      </div>

    </footer>
  );
}