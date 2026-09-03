import React, { createContext, useContext, useReducer } from 'react';

// Importación directa de imágenes desde assets
import PantallaSmart from '../assets/Productos/PantallaSmart.png';
import PantaMiniLed from '../assets/Productos/PantaMiniLed.png';
import Lapt14 from '../assets/Productos/Lapt14.png';
import Laptop15 from '../assets/Productos/Laptop15.png';
import Mochila from '../assets/Productos/Mochila.png';
import Reloj from '../assets/Productos/Reloj.png';
import Bocina from '../assets/Productos/Bocina.png';
import Airport from '../assets/Productos/Airport.png';
import Smartwat from '../assets/Productos/Smartwat.png';
import MaletaAma from '../assets/Productos/MaletaAma.png';
import teclado11 from '../assets/Productos/teclado11.png';
import mouse12 from '../assets/Productos/mouse12.png';
import soporte13 from '../assets/Productos/soporte13.png';
import hub14 from '../assets/Productos/hub14.png';
import microfono15 from '../assets/Productos/microfono15.png';
import monitor16 from '../assets/Productos/monitor16.png';
import disco17 from '../assets/Productos/disco17.png';
import mousepad18 from '../assets/Productos/mousepad18.png';
import lampara19 from '../assets/Productos/lampara19.png';
import camara20 from '../assets/Productos/camara20.png';

// 1. Crear el Contexto
const CartContext = createContext();

// Productos de NovaStore
const rawProducts = [
  { id: 1, name: 'Samsung Smart TV 55" Crystal UHD DU7000 (2024)', oldPrice: 599.00, price: 429.00, discountPercent: 28, isOffer: true, stock: 5, description: 'Procesador Crystal 4K, HDR10+ y sistema operativo Tizen.', image: PantallaSmart },
  { id: 2, name: 'Samsung 55" Neo QLED 4K QN85D', oldPrice: 1399.00, price: 999.00, discountPercent: 29, isOffer: true, stock: 5, description: 'Tecnología Quantum Matrix con Mini LED y procesador NQ4 AI Gen2.', image: PantaMiniLed },
  { id: 3, name: 'Laptop HP 14-ep0015la Intel Core i3-N305', oldPrice: 479.00, price: 389.00, discountPercent: 19, isOffer: true, stock: 8, description: '8GB RAM LPDDR5, 512GB SSD, pantalla 14" FHD.', image: Lapt14 },
  { id: 4, name: 'Laptop HP Pavilion 15-eg3000la Intel Core i5-1335U', oldPrice: 849.00, price: 699.00, discountPercent: 18, isOffer: true, stock: 6, description: '16GB RAM, 512GB SSD, pantalla táctil 15.6" Full HD.', image: Laptop15 },
  { id: 5, name: 'Mochila Under Armour Hustle 5.0 Backpack 29L', oldPrice: 55.00, price: 39.99, discountPercent: 27, isOffer: true, stock: 10, description: 'Tecnología UA Storm resistente al agua con funda para laptop de 15".', image: Mochila },
  { id: 6, name: 'Reloj Fossil Nate Chronograph Black Stainless Steel (JR1401)', oldPrice: 195.00, price: 136.50, discountPercent: 30, isOffer: true, stock: 7, description: 'Caja de 50 mm, movimiento de cuarzo y resistencia al agua 10 ATM.', image: Reloj },
  { id: 7, name: 'Bocina Bluetooth Bose SoundLink Flex (Gen 2)', oldPrice: 149.00, price: 129.00, discountPercent: 13, isOffer: true, stock: 8, description: 'Certificación IP67 resistente al agua y polvo, hasta 12 horas de batería.', image: Bocina },
  { id: 8, name: 'Audífonos Apple AirPods Pro (2.ª generación) USB-C', oldPrice: 249.00, price: 189.00, discountPercent: 24, isOffer: true, stock: 9, description: 'Cancelación Activa de Ruido, Audio Espacial y estuche MagSafe.', image: Airport },
  { id: 9, name: 'Smartwatch Argom Tech T9080 SkeiWatch C70', oldPrice: 45.00, price: 34.99, discountPercent: 22, isOffer: true, stock: 12, description: 'Pantalla táctil HD de 1.39", monitor de oxígeno y ritmo cardíaco.', image: Smartwat },
  { id: 10, name: 'Maleta American Tourister Starvibe Spinner 55cm', oldPrice: 140.00, price: 98.00, discountPercent: 30, isOffer: true, stock: 6, description: 'Equipaje de mano rígido en polipropileno expansible con cerradura TSA.', image: MaletaAma },

  { id: 11, name: 'Teclado Mecánico Redragon Kumara K552 RGB', oldPrice: 45.00, price: 45.00, discountPercent: 0, isOffer: false, stock: 15, description: 'Switches mecánicos Outemu Blue y retroiluminación RGB.', image: teclado11 },
  { id: 12, name: 'Mouse Inalámbrico Ergonómico Logitech MX Master 3S', oldPrice: 99.99, price: 99.99, discountPercent: 0, isOffer: false, stock: 12, description: 'Sensor de 8000 DPI y clicks silenciosos para máxima productividad.', image: mouse12 },
  { id: 13, name: 'Soporte Ajustable de Aluminio UGREEN para Laptop', oldPrice: 29.99, price: 29.99, discountPercent: 0, isOffer: false, stock: 20, description: 'Diseño plegable ergonómico compatible con laptops de 11 a 17 pulgadas.', image: soporte13 },
  { id: 14, name: 'Hub USB-C UGREEN 7 en 1 (HDMI 4K, 100W PD, SD/TF)', oldPrice: 39.99, price: 39.99, discountPercent: 0, isOffer: false, stock: 15, description: 'Puerto HDMI 4K@60Hz, 2 puertos USB 3.0 y lector de tarjetas.', image: hub14 },
  { id: 15, name: 'Micrófono Condensador USB HyperX SoloCast', oldPrice: 59.99, price: 59.99, discountPercent: 0, isOffer: false, stock: 10, description: 'Patrón polar cardioide con sensor de toque para silenciar.', image: microfono15 },
  { id: 16, name: 'Monitor LG 24GQ50F-B Gaming 24" FHD 165Hz', oldPrice: 149.99, price: 149.99, discountPercent: 0, isOffer: false, stock: 8, description: 'Tiempo de respuesta 1ms MBR, AMD FreeSync Premium.', image: monitor16 },
  { id: 17, name: 'Disco Duro Externo WD My Passport 2TB USB 3.0', oldPrice: 79.99, price: 79.99, discountPercent: 0, isOffer: false, stock: 10, description: 'Almacenamiento portátil con protección de contraseña y cifrado por hardware.', image: disco17 },
  { id: 18, name: 'Mousepad Gamer Corsair MM300 PRO Extended XL', oldPrice: 29.99, price: 29.99, discountPercent: 0, isOffer: false, stock: 20, description: 'Superficie de tela a prueba de derrames con bordes cosidos.', image: mousepad18 },
  { id: 19, name: 'Lámpara de Escritorio Taotronics LED con Carga Qi', oldPrice: 35.00, price: 35.00, discountPercent: 0, isOffer: false, stock: 12, description: '5 modos de color, 7 niveles de brillo y base con carga inalámbrica.', image: lampara19 },
  { id: 20, name: 'Webcam Logitech C920 HD Pro 1080p', oldPrice: 69.99, price: 69.99, discountPercent: 0, isOffer: false, stock: 14, description: 'Videollamadas Full HD con micrófono estéreo doble y corrección de luz.', image: camara20 }
];

// Estado Inicial
const initialState = {
  products: rawProducts,
  cart: [],
  isCartOpen: false,
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.id !== id) };
      }
      return {
        ...state,
        cart: state.cart.map(item => item.id === id ? { ...item, quantity } : item),
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    default:
      return state;
  }
};

// 2. Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        isCartOpen: state.isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook Personalizado
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};