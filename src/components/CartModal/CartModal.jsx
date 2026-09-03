import React, {
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef
} from 'react';

import { useCart } from '../../context/CartContext';
import styles from './CartModal.module.css';

const CartModal = forwardRef((props, ref) => {

  const {
    state,
    toggleCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [paso, setPaso] = useState('carrito');

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    direccion: '',
    telefono: ''
  });

  const [codigoCupon, setCodigoCupon] = useState('');

  const modalRef = useRef(null);

  // useLayoutEffect: mide el modal antes de mostrar los cambios visuales
  useLayoutEffect(() => {
    if (state.isCartOpen && modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();

      console.log(
        'Dimensiones del carrito:',
        rect.width,
        rect.height
      );
    }
  }, [state.isCartOpen]);

  // useImperativeHandle: permite controlar el modal desde otro componente
  useImperativeHandle(ref, () => ({
    abrirCarrito: () => {
      if (!state.isCartOpen) {
        toggleCart();
      }
    },

    cerrarCarrito: () => {
      if (state.isCartOpen) {
        toggleCart();
      }
    },

    resetearPaso: () => {
      setPaso('carrito');
    }
  }), [state.isCartOpen, toggleCart]);

  // useMemo: calcula subtotal, descuento, impuestos, envío y total
  const {
    subtotal,
    descuento,
    impuestos,
    envio,
    total
  } = useMemo(() => {

    const subtotalCalculado = state.cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const descuentoCalculado = state.coupon
      ? subtotalCalculado * state.coupon.discount
      : 0;

    const subtotalConDescuento =
      subtotalCalculado - descuentoCalculado;

    const impuestosCalculados =
      subtotalConDescuento * 0.13;

    const envioCalculado =
      subtotalConDescuento >= 100 ? 0 : 5;

    const totalCalculado =
      subtotalConDescuento +
      impuestosCalculados +
      envioCalculado;

    return {
      subtotal: subtotalCalculado,
      descuento: descuentoCalculado,
      impuestos: impuestosCalculados,
      envio: envioCalculado,
      total: totalCalculado
    };

  }, [state.cart, state.coupon]);

  if (!state.isCartOpen) return null;

  const handleCerrar = () => {
    setPaso('carrito');
    toggleCart();
  };

  const handleInputChange = (e) => {
    setDatosEnvio({
      ...datosEnvio,
      [e.target.name]: e.target.value
    });
  };

  const handleAplicarCupon = () => {

    if (codigoCupon.trim().toUpperCase() === 'NOVA10') {

      applyCoupon({
        code: 'NOVA10',
        discount: 0.10
      });

      setCodigoCupon('');

    } else {
      alert('Cupón no válido. Prueba con NOVA10.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    clearCart();
    removeCoupon();
    setPaso('exito');
  };

  return (
    <div className={styles.overlay}>

      <div
        className={styles.modal}
        ref={modalRef}
      >

        <button
          className={styles.closeBtn}
          onClick={handleCerrar}
        >
          ✕
        </button>

        {/* PASO 1: CARRITO */}
        {paso === 'carrito' && (
          <>

            <h2>Tu Carrito de Compras</h2>

            {state.cart.length === 0 ? (

              <p className={styles.emptyMsg}>
                El carrito está vacío 🛒
              </p>

            ) : (

              <>

                <div className={styles.listaProductos}>

                  {state.cart.map((item) => (

                    <div
                      key={item.id}
                      className={styles.itemCart}
                    >

                      <div>
                        <h4>{item.name}</h4>

                        <p>
                          ${item.price.toFixed(2)} c/u
                        </p>

                        {/* CONTROL DE CANTIDAD */}
                        <div className={styles.quantityControl}>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                      <button
                        className={styles.removeBtn}
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Eliminar
                      </button>

                    </div>

                  ))}

                </div>

                {/* CUPÓN */}
                <div className={styles.couponBox}>

                  <input
                    type="text"
                    placeholder="Código de cupón"
                    value={codigoCupon}
                    onChange={(e) =>
                      setCodigoCupon(e.target.value)
                    }
                  />

                  <button
                    className={styles.secondaryBtn}
                    onClick={handleAplicarCupon}
                  >
                    Aplicar
                  </button>

                </div>

                {state.coupon && (
                  <div className={styles.couponApplied}>

                    <span>
                      Cupón {state.coupon.code} aplicado:
                      10% de descuento
                    </span>

                    <button
                      onClick={removeCoupon}
                    >
                      Quitar
                    </button>

                  </div>
                )}

                {/* RESUMEN */}
                <div className={styles.footerCart}>

                  <div>

                    <p>
                      Subtotal: ${subtotal.toFixed(2)}
                    </p>

                    {descuento > 0 && (
                      <p>
                        Descuento: -$
                        {descuento.toFixed(2)}
                      </p>
                    )}

                    <p>
                      Impuestos: ${impuestos.toFixed(2)}
                    </p>

                    <p>
                      Envío:{' '}
                      {envio === 0
                        ? 'Gratis'
                        : `$${envio.toFixed(2)}`}
                    </p>

                    <h3>
                      Total: ${total.toFixed(2)}
                    </h3>

                  </div>

                  <button
                    className={styles.primaryBtn}
                    onClick={() =>
                      setPaso('formulario')
                    }
                  >
                    Proceder al Pago 💳
                  </button>

                </div>

              </>

            )}

          </>
        )}

        {/* PASO 2: FORMULARIO */}
        {paso === 'formulario' && (
          <>

            <h2>Datos de Envío</h2>

            <form
              onSubmit={handleSubmit}
              className={styles.formContainer}
            >

              <div className={styles.inputGroup}>

                <label>
                  Nombre Completo:
                </label>

                <input
                  type="text"
                  name="nombre"
                  required
                  value={datosEnvio.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej. Ana Rodríguez"
                />

              </div>

              <div className={styles.inputGroup}>

                <label>
                  Dirección de Envío:
                </label>

                <input
                  type="text"
                  name="direccion"
                  required
                  value={datosEnvio.direccion}
                  onChange={handleInputChange}
                  placeholder="Ej. San Salvador, Calle Principal #123"
                />

              </div>

              <div className={styles.inputGroup}>

                <label>
                  Teléfono de Contacto:
                </label>

                <input
                  type="tel"
                  name="telefono"
                  required
                  value={datosEnvio.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej. 7000-0000"
                />

              </div>

              <div className={styles.btnRow}>

                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() =>
                    setPaso('carrito')
                  }
                >
                  Volver al Carrito
                </button>

                <button
                  type="submit"
                  className={styles.primaryBtn}
                >
                  Confirmar Pedido
                  (${total.toFixed(2)})
                </button>

              </div>

            </form>

          </>
        )}

        {/* PASO 3: ÉXITO */}
        {paso === 'exito' && (

          <div className={styles.exitoBox}>

            <h2>
              ¡Pedido Confirmado! 🎉
            </h2>

            <p>
              Gracias por tu compra,{' '}
              <strong>
                {datosEnvio.nombre}
              </strong>.
            </p>

            <p>
              Enviaremos los detalles de tu paquete
              a tu dirección en breve.
            </p>

            <button
              className={styles.primaryBtn}
              onClick={handleCerrar}
            >
              Volver a la Tienda
            </button>

          </div>

        )}

      </div>

    </div>
  );
});

export default CartModal;