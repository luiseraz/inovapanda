import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar lista de desejos do localStorage ao iniciar
  useEffect(() => {
    const loadWishlistFromStorage = () => {
      try {
        const storedWishlist = localStorage.getItem('wishlistItems');
        if (storedWishlist) {
          setWishlistItems(JSON.parse(storedWishlist));
        }
      } catch (err) {
        console.error('Erro ao carregar lista de desejos do localStorage:', err);
        toast.error('Não foi possível carregar sua lista de desejos');
      }
    };

    loadWishlistFromStorage();
  }, []);

  // Atualizar localStorage quando a lista de desejos mudar
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Adicionar produto à lista de desejos
  const addToWishlist = (product) => {
    setLoading(true);
    try {
      // Verificar se o produto já existe na lista
      const existItem = wishlistItems.find(item => item._id === product._id);
      
      if (existItem) {
        toast.error('Este produto já está na sua lista de desejos');
      } else {
        // Adicionar novo item
        const wishlistItem = {
          _id: product._id,
          name: product.name,
          image: product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/300',
          price: product.discountPrice || product.price,
          category: product.category,
          rating: product.rating,
          addedAt: new Date().toISOString()
        };
        
        setWishlistItems(prev => [...prev, wishlistItem]);
        toast.success('Produto adicionado à lista de desejos');
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Erro ao adicionar à lista de desejos:', err);
      toast.error('Erro ao adicionar produto à lista de desejos');
      setLoading(false);
      return false;
    }
  };

  // Remover item da lista de desejos
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== id));
    toast.success('Produto removido da lista de desejos');
  };

  // Verificar se um produto está na lista de desejos
  const isInWishlist = (id) => {
    return wishlistItems.some(item => item._id === id);
  };

  // Limpar lista de desejos
  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Lista de desejos limpa com sucesso');
  };

  const value = {
    wishlistItems,
    loading,
    wishlistCount: wishlistItems.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistContext; 