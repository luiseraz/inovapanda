import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calcular totais
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 30;
  const totalPrice = itemsPrice + shippingPrice;
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (err) {
        console.error('Erro ao carregar carrinho do localStorage:', err);
        setError('Não foi possível carregar seu carrinho');
      }
    };

    loadCartFromStorage();
  }, []);

  // Atualizar localStorage quando o carrinho mudar
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adicionar produto ao carrinho
  const addToCart = (product, qty = 1) => {
    setLoading(true);
    try {
      const existItem = cartItems.find(item => item._id === product._id);
      
      if (existItem) {
        // Atualizar quantidade se já existe
        setCartItems(
          cartItems.map(item => 
            item._id === existItem._id ? { ...item, qty: item.qty + qty } : item
          )
        );
      } else {
        // Adicionar novo item
        setCartItems([...cartItems, {
          _id: product._id,
          name: product.name,
          image: product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/300',
          price: product.discountPrice || product.price,
          countInStock: product.countInStock,
          qty
        }]);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Erro ao adicionar ao carrinho:', err);
      setError('Erro ao adicionar produto ao carrinho');
      setLoading(false);
      return false;
    }
  };

  // Remover item do carrinho
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  // Atualizar quantidade de um item
  const updateCartItemQty = (id, qty) => {
    setCartItems(
      cartItems.map(item => 
        item._id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    loading,
    error,
    itemsPrice,
    shippingPrice,
    totalPrice,
    cartItemsCount,
    addToCart,
    removeFromCart,
    updateCartItemQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 