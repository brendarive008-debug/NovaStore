import React, { createContext, useContext, useReducer } from 'react';

// Lista de productos con rutas directas desde la carpeta public
const rawProducts = [
  { id: 1, name: 'Samsung Smart TV 55" Crystal UHD DU7000 (2024)', oldPrice: 599.00, price: 429.00, discountPercent: 28, isOffer: true, stock: 5, description: 'Procesador Crystal 4K, HDR10+ y sistema operativo Tizen.', image: '/productos/PantallaSmart.png' },
  { id: 2, name: 'Samsung 55" Neo QLED 4K QN85D', oldPrice: 1399.00, price: 999.00, discountPercent: 29, isOffer: true, stock: 5, description: 'Tecnología Quantum Matrix con Mini LED y procesador NQ4 AI Gen2.', image: '/productos/PantaMiniLed.png' },
  { id: 3, name: 'Laptop HP 14-ep0015la Intel Core i3-N305', oldPrice: 479.00, price: 389.00, discountPercent: 19, isOffer: true, stock: 8, description: '8GB RAM LPDDR5, 512GB SSD, pantalla 14" FHD.', image: '/productos/Lapt14.png' },
  { id: 4, name: 'Laptop HP Pavilion 15-eg3000la Intel Core i5-1335U', oldPrice: 849.00, price: 699.00, discountPercent: 18, isOffer: true, stock: 6, description: '16GB RAM, 512GB SSD, pantalla táctil 15.6" Full HD.', image: '/productos/Laptop15.png' },
  { id: 5, name: 'Mochila Under Armour Hustle 5.0 Backpack 29L', oldPrice: 55.00, price: 39.99, discountPercent: 27, isOffer: true, stock: 10, description: 'Tecnología UA Storm resistente al agua con funda para laptop de 15".', image: '/productos/Mochila.png' },
  { id: 6, name: 'Reloj Fossil Nate Chronograph Black Stainless Steel (JR1401)', oldPrice: 195.00, price: 136.50, discountPercent: 30, isOffer: true, stock: 7, description: 'Caja de 50 mm, movimiento de cuarzo y resistencia al agua 10 ATM.', image: '/productos/Reloj.png' },
  { id: 7, name: 'Bocina Bluetooth Bose SoundLink Flex (Gen 2)', oldPrice: 149.00, price: 129.00, discountPercent: 13, isOffer: true, stock: 8, description: 'Certificación IP67 resistente al agua y polvo, hasta 12 horas de batería.', image: '/productos/Bocina.png' },
  { id: 8, name: 'Audífonos Apple AirPods Pro (2.ª generación) USB-C', oldPrice: 249.00, price: 189.00, discountPercent: 24, isOffer: true, stock: 9, description: 'Cancelación Activa de Ruido, Audio Espacial y estuche MagSafe.', image: '/productos/Airport.png' },
  { id: 9, name: 'Smartwatch Argom Tech T9080 SkeiWatch C70', oldPrice: 45.00, price: 34.99, discountPercent: 22, isOffer: true, stock: 12, description: 'Pantalla táctil HD de 1.39", monitor de oxígeno y ritmo cardíaco.', image: '/productos/Smartwat.png' },
  { id: 10, name: 'Maleta American Tourister Starvibe Spinner 55cm', oldPrice: 140.00, price: 98.00, discountPercent: 30, isOffer: true, stock: 6, description: 'Equipaje de mano rígido en polipropileno expansible con cerradura TSA.', image: '/productos/MaletaAma.png' },
  { id: 11, name: 'Teclado Mecánico Redragon Kumara K552 RGB', oldPrice: 45.00, price: 45.00, discountPercent: 0, isOffer: false, stock: 15, description: 'Switches mecánicos Outemu Blue y retroiluminación RGB.', image: '/productos/teclado11.png' },
  { id: 12, name: 'Mouse Inalámbrico Ergonómico Logitech MX Master 3S', oldPrice: 99.99, price: 99.99, discountPercent: 0, isOffer: false, stock: 12, description: 'Sensor de 8000 DPI y clicks silenciosos para máxima productividad.', image: '/productos/mouse12.png' },
  { id: 13, name: 'Soporte Ajustable de Aluminio UGREEN para Laptop', oldPrice: 29.99, price: 29.99, discountPercent: 0, isOffer: false, stock: 20, description: 'Diseño plegable ergonómico compatible con laptops de 11 a 17 pulgadas.', image: '/productos/soporte13.png' },
  { id: 14, name: 'Hub USB-C UGREEN 7 en 1 (HDMI 4K, 100W PD, SD/TF)', oldPrice: 39.99, price: 39.99, discountPercent: 0, isOffer: false, stock: 15, description: 'Puerto HDMI 4K@60Hz, 2 puertos USB 3.0 y lector de tarjetas.', image: '/productos/hub14.png' },
  { id: 15, name: 'Micrófono Condensador USB HyperX SoloCast', oldPrice: 59.99, price: 59.99, discountPercent: 0, isOffer: false, stock: 10, description: 'Patrón polar cardioide con sensor de toque para silenciar.', image: '/productos/microfono15.png' },
  { id: 16, name: 'Monitor LG 24GQ50F-B Gaming 24" FHD 165Hz', oldPrice: 149.99, price: 149.99, discountPercent: 0, isOffer: false, stock: 8, description: 'Tiempo de respuesta 1ms MBR, AMD FreeSync Premium.', image: '/productos/monitor16.png' },
  { id: 17, name: 'Disco Duro Externo WD My Passport 2TB USB 3.0', oldPrice: 79.99, price: 79.99, discountPercent: 0, isOffer: false, stock: 10, description: 'Almacenamiento portátil con protección de contraseña y cifrado por hardware.', image: '/productos/disco17.png' },
  { id: 18, name: 'Mousepad Gamer Corsair MM300 PRO Extended XL', oldPrice: 29.99, price: 29.99, discountPercent: 0, isOffer: false, stock: 20, description: 'Superficie de tela a prueba de derrames con bordes cosidos.', image: '/productos/alfombrilla de ratón18.png' },
  { id: 19, name: 'Lámpara de Escritorio Taotronics LED con Carga Qi', oldPrice: 35.00, price: 35.00, discountPercent: 0, isOffer: false, stock: 12, description: '5 modos de color, 7 niveles de brillo y base con carga inalámbrica.', image: '/productos/lampara19.png' },
  { id: 20, name: 'Webcam Logitech C920 HD Pro 1080p', oldPrice: 69.99, price: 69.99, discountPercent: 0, isOffer: false, stock: 14, description: 'Videollamadas Full HD con micrófono estéreo doble y corrección de luz.', image: '/productos/cámara20.png' }
];

const initialState = {
  cart: [],
  products: rawProducts,
  theme: 'light',
  filterOfferOnly: false,
  selectedProductId: null,
  isCartOpen: false,
  coupon: null
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = state.products.find(p => p.id === action.payload.id);
      if (!product) return state;
      const existingItem = state.cart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) return state;
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...state, cart: [...state.cart, { ...product, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return { ...state, cart: state.cart.filter(item => item.id !== id) };
      const product = state.products.find(p => p.id === id);
      if (!product || quantity > product.stock) return state;
      return {
        ...state,
        cart: state.cart.map(item => item.id === id ? { ...item, quantity } : item)
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_FILTER_OFFERS':
      return { ...state, filterOfferOnly: action.payload, selectedProductId: null };
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProductId: action.payload };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = id => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const applyCoupon = coupon => dispatch({ type: 'APPLY_COUPON', payload: coupon });
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });
  const setTheme = themeName => dispatch({ type: 'SET_THEME', payload: themeName });
  const setFilterOffers = status => dispatch({ type: 'SET_FILTER_OFFERS', payload: status });
  const setSelectedProduct = id => dispatch({ type: 'SET_SELECTED_PRODUCT', payload: id });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setTheme,
        setFilterOffers,
        setSelectedProduct,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);