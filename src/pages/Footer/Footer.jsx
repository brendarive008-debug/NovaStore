// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerInfo}>
          <h3>NovaStore</h3>
          <p>Tu tienda de confianza en tecnología, dispositivos y accesorios con calidad garantizada.</p>
        </div>
        <div className={styles.footerLinks}>
          <h4>Enlaces Rápidos</h4>
          <a href="/">Inicio</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/informacion">Información</a>
        </div>
        <div className={styles.footerContact}>
          <h4>Contacto</h4>
          <p>Email: soporte@novastore.com</p>
          <p>Teléfono: +503 0000-0000</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} NovaStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}