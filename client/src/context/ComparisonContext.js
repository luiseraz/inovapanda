import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ComparisonContext = createContext();

export const useComparison = () => {
  return useContext(ComparisonContext);
};

export const ComparisonProvider = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Carregar itens de comparação do localStorage ao iniciar
  useEffect(() => {
    const loadComparisonFromStorage = () => {
      try {
        const storedComparison = localStorage.getItem('comparisonItems');
        if (storedComparison) {
          setComparisonItems(JSON.parse(storedComparison));
        }
      } catch (err) {
        console.error('Erro ao carregar itens de comparação do localStorage:', err);
        setError('Não foi possível carregar sua lista de comparação');
      }
    };

    loadComparisonFromStorage();
  }, []);

  // Atualizar localStorage quando os itens de comparação mudarem
  useEffect(() => {
    localStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
  }, [comparisonItems]);

  // Adicionar produto à comparação
  const addToComparison = (product) => {
    setLoading(true);
    try {
      // Verificar se o produto já existe na lista
      const existItem = comparisonItems.find(item => item._id === product._id);
      
      if (existItem) {
        toast.error('Este produto já está na sua lista de comparação');
      } else if (comparisonItems.length >= 4) {
        toast.error('Você só pode comparar até 4 produtos simultaneamente');
      } else {
        // Adicionar novo item com dados simplificados
        const comparisonItem = {
          _id: product._id,
          name: product.name,
          image: product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/300',
          price: product.discountPrice || product.price,
          category: product.category,
          brand: product.brand || 'Não especificada',
          rating: product.rating,
          countInStock: product.countInStock,
          specs: product.specs || [],
          description: product.description || ''
        };
        
        setComparisonItems(prev => [...prev, comparisonItem]);
        toast.success('Produto adicionado à comparação');
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Erro ao adicionar à comparação:', err);
      setError('Erro ao adicionar produto à comparação');
      setLoading(false);
      return false;
    }
  };

  // Remover item da comparação
  const removeFromComparison = (id) => {
    setComparisonItems(comparisonItems.filter(item => item._id !== id));
    toast.success('Produto removido da comparação');
  };

  // Verificar se um produto está na comparação
  const isInComparison = (id) => {
    return comparisonItems.some(item => item._id === id);
  };

  // Limpar lista de comparação
  const clearComparison = () => {
    setComparisonItems([]);
    toast.success('Lista de comparação limpa');
  };

  const value = {
    comparisonItems,
    loading,
    error,
    comparisonCount: comparisonItems.length,
    addToComparison,
    removeFromComparison,
    isInComparison,
    clearComparison
  };

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export default ComparisonContext; 