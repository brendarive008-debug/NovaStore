import React, { createContext, useContext, useReducer } from 'react';

// Función para resolver la URL dinámica de las imágenes en assets
const getImageUrl = (imageName) => {
  return new URL(`../assets/Productos/${imageName}`, import.meta.url).href;
};

// Productos de NovaStore
const rawProducts = [
  { id: 1, name: 'Samsung Smart TV 55" Crystal UHD DU7000 (2024)', oldPrice: 599.00, price: 429.00, discountPercent: 28, isOffer: true, stock: 5, description: 'Procesador Crystal 4K, HDR10+ y sistema operativo Tizen.', image: getImageUrl('PantallaSmart.png') },
  { id: 2, name: 'Samsung 55" Neo QLED 4K QN85D', oldPrice: 1399.00, price: 999.00, discountPercent: 29, isOffer: true, stock: 5, description: 'Tecnología Quantum Matrix con Mini LED y procesador NQ4 AI Gen2.', image: getImageUrl('PantaMiniLed.png') },
  { id: 3, name: 'Laptop HP 14-ep0015la Intel Core i3-N305', oldPrice: 479.00, price: 389.00, discountPercent: 19, isOffer: true, stock: 8, description: '8GB RAM LPDDR5, 512GB SSD, pantalla 14" FHD.', image: getImageUrl('Lapt14.png') },
  { id: 4, name: 'Laptop HP Pavilion 15-eg3000la Intel Core i5-1335U', oldPrice: 849.00, price: 699.00, discountPercent: 18, isOffer: true, stock: 6, description: '16GB RAM, 512GB SSD, pantalla táctil 15.6" Full HD.', image: getImageUrl('Laptop15.png') },
  { id: 5, name: 'Mochila Under Armour Hustle 5.0 Backpack 29L', oldPrice: 55.00, price: 39.99, discountPercent: 27, isOffer: true, stock: 10, description: 'Tecnología UA Storm resistente al agua con funda para laptop de 15".', image: getImageUrl('Mochila.png') },
  { id: 6, name: 'Reloj Fossil Nate Chronograph Black Stainless Steel (JR1401)', oldPrice: 195.00, price: 136.50, discountPercent: 30, isOffer: true, stock: 7, description: 'Caja de 50 mm, movimiento de cuarzo y resistencia al agua 10 ATM.', image: getImageUrl('Reloj.png') },
  { id: 7, name: 'Bocina Bluetooth Bose SoundLink Flex (Gen 2)', oldPrice: 149.00, price: 129.00, discountPercent: 13, isOffer: true, stock: 8, description: 'Certificación IP67 resistente al agua y polvo, hasta 12 horas de batería.', image: getImageUrl('Bocina.png') },
  { id: 8, name: 'Audífonos Apple AirPods Pro (2.ª generación) USB-C', oldPrice: 249.00, price: 189.00, discountPercent: 24, isOffer: true, stock: 9, description: 'Cancelación Activa de Ruido, Audio Espacial y estuche MagSafe.', image: getImageUrl('Airport.png') },
  { id: 9, name: 'Smartwatch Argom Tech T9080 SkeiWatch C70', oldPrice: 45.00, price: 34.99, discountPercent: 22, isOffer: true, stock: 12, description: 'Pantalla táctil HD de 1.39", monitor de oxígeno y ritmo cardíaco.', image: getImageUrl('Smartwat.png') },
  { id: 10, name: 'Maleta American Tourister Starvibe Spinner 55cm', oldPrice: 140.00, price: 98.00, discountPercent: 30, isOffer: true, stock: 6, description: 'Equipaje de mano rígido en polipropileno expansible con cerradura TSA.', image: getImageUrl('MaletaAma.png') },

  { id: 11, name: 'Teclado Mecánico Redragon Kumara K552 RGB', oldPrice: 45.00, price: 45.00, discountPercent: 0, isOffer: false, stock: 15, description: 'Switches mecánicos Outemu Blue y retroiluminación RGB.', image: getImageUrl('teclado11.png') },
  { id: 12, name: 'Mouse Inalámbrico Ergonómico Logitech MX Master 3S', oldPrice: 99.99, price: 99.99, discountPercent: 0, isOffer: false, stock: 12, description: 'Sensor de 8000 DPI y clicks silenciosos para máxima productividad.', image: getImageUrl('mouse12.png') },
  { id: 13, name: 'Soporte Ajustable de Aluminio UGREEN para Laptop', oldPrice: 29.99, price: 29.99, discountPercent: 0, isOffer: false, stock: 20, description: 'Diseño plegable ergonómico compatible con laptops de 11 a 17 pulgadas.', image: getImageUrl('soporte13.png') },
  { id: 14, name: 'Hub USB-C UGREEN 7 en 1 (HDMI 4K, 100W PD, SD/TF)', oldPrice: 39.99, price: 39.99, discountPercent: 0, isOffer: false, stock: 15, description: 'Puerto HDMI 4K@60Hz, 2 puertos USB 3.0 y lector de tarjetas.', image: getImageUrl('hub14.png') },
  { id: 15, name: 'Micrófono Condensador USB HyperX SoloCast', oldPrice: 59.99, price: 59.99, discountPercent: 0, isOffer: false, stock: 10, description: 'Patrón polar cardioide con sensor de toque para silenciar.', image: getImageUrl('microfono15.png') },
  { id: 16, name: 'Monitor LG 24GQ50F-B Gaming 24" FHD 165Hz', oldPrice: 149.99, price: 149.99, discountPercent: 0, isOffer: false, stock: 8, description: 'Tiempo de respuesta 1ms MBR, AMD FreeSync Premium.', image: getImageUrl('monitor16.png') },
  { id: 17, name: 'Disco Duro Externo WD My Passport 2TB USB 3.0', oldPrice: 79.99, price: 79.99, discountPercent: 0, isOffer: false, stock: 10, description: 'Almacenamiento portátil con protección de contraseña y cifrado por hardware.', image: getImageUrl('disco17.png') },
  { id: 18, name: 'Mousepad Gamer Corsair MM300 PRO Extended XL', oldPrice: 29.99, price: 29.99, discountPercent: 0, isOffer: false, stock: 20, description: 'Superficie de tela a prueba de derrames con bordes cosidos.', image: getImageUrl('mousepad18.png') },
  { id: 19, name: 'Lámpara de Escritorio Taotronics LED con Carga Qi', oldPrice: 35.00, price: 35.00, discountPercent: 0, isOffer: false, stock: 12, description: '5 modos de color, 7 niveles de brillo y base con carga inalámbrica.', image: getImageUrl('lampara19.png') },
  { id: 20, name: 'Webcam Logitech C920 HD Pro 1080p', oldPrice: 69.99, price: 69.99, discountPercent: 0, isOffer: false, stock: 14, description: 'Videollamadas Full HD con micrófono estéreo doble y corrección de luz.', image: getImageUrl('camara20.png') }
];