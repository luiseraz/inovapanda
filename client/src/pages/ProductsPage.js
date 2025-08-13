import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFilter, FaSort, FaSearch, FaStar } from 'react-icons/fa';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category') || '';
  const searchFromUrl = queryParams.get('search') || '';
  
  // Estados para filtros e busca
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [categoryFilter, setCategoryFilter] = useState(categoryFromUrl);
  const [priceFilter, setPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Atualizar filtros quando mudar a URL
  useEffect(() => {
    setCategoryFilter(categoryFromUrl);
    setSearchQuery(searchFromUrl);
  }, [categoryFromUrl, searchFromUrl]);
  
  // Produtos de exemplo (em um app real, viriam da API)
  const products = [
    { 
      id: 1, 
      name: 'Smartphone XTech Pro', 
      category: 'Smartphones',
      price: 2499.99,
      oldPrice: 2999.99,
      rating: 4.8,
      reviewCount: 124,
      image: '/placeholder.png'
    },
    { 
      id: 2, 
      name: 'Fone de Ouvido Wireless', 
      category: 'Acessórios',
      price: 299.99,
      oldPrice: 399.99,
      rating: 4.6,
      reviewCount: 89,
      image: '/placeholder.png'
    },
    { 
      id: 3, 
      name: 'Smart Watch Series 5', 
      category: 'Smartwatches',
      price: 899.99,
      oldPrice: 1099.99,
      rating: 4.5,
      reviewCount: 56,
      image: '/placeholder.png'
    },
    { 
      id: 4, 
      name: 'Tablet Ultra Slim', 
      category: 'Tablets',
      price: 1299.99,
      oldPrice: 1499.99,
      rating: 4.7,
      reviewCount: 42,
      image: '/placeholder.png'
    },
    { 
      id: 5, 
      name: 'Carregador Sem Fio 15W', 
      category: 'Acessórios',
      price: 149.99,
      oldPrice: 199.99,
      rating: 4.3,
      reviewCount: 78,
      image: '/placeholder.png'
    },
    { 
      id: 6, 
      name: 'Câmera de Segurança WiFi', 
      category: 'Smart Home',
      price: 349.99,
      oldPrice: 429.99,
      rating: 4.4,
      reviewCount: 32,
      image: '/placeholder.png'
    },
    { 
      id: 7, 
      name: 'Caixa de Som Bluetooth', 
      category: 'Áudio',
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.2,
      reviewCount: 65,
      image: '/placeholder.png'
    },
    { 
      id: 8, 
      name: 'Notebook Ultrafino', 
      category: 'Notebooks',
      price: 3999.99,
      oldPrice: 4499.99,
      rating: 4.9,
      reviewCount: 28,
      image: '/placeholder.png'
    }
  ];
  
  // Lista de categorias únicas para o filtro
  const categories = [...new Set(products.map(product => product.category))];
  
  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    // Filtro de busca
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtro de categoria
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    
    // Filtro de preço
    let matchesPrice = true;
    if (priceFilter === 'under100') {
      matchesPrice = product.price < 100;
    } else if (priceFilter === '100to500') {
      matchesPrice = product.price >= 100 && product.price <= 500;
    } else if (priceFilter === '500to1000') {
      matchesPrice = product.price > 500 && product.price <= 1000;
    } else if (priceFilter === 'over1000') {
      matchesPrice = product.price > 1000;
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // Ordenar produtos
  let sortedProducts = [...filteredProducts];
  if (sortBy === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }
  
  // Função para lidar com a busca
  const handleSearch = (e) => {
    e.preventDefault();
    // Aqui poderia atualizar a URL, mas como é só exemplo, apenas atualiza o estado
    console.log('Searching for:', searchQuery);
  };
  
  // Renderizar estrelas de avaliação
  const renderRatingStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">
          {rating}
        </span>
      </div>
    );
  };
  
  return (
    <div className="container-custom mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{categoryFilter || 'Todos os Produtos'}</h1>
        <p className="text-gray-600 mt-2">
          {filteredProducts.length} produtos encontrados
        </p>
      </div>
      
      {/* Barra de busca e filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-700"
              >
                <FaSearch />
              </button>
            </div>
          </form>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-white border px-4 py-2 rounded-md hover:bg-gray-50"
            >
              <FaFilter className="mr-2" />
              Filtros
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border px-4 py-2 rounded-md hover:bg-gray-50 appearance-none"
            >
              <option value="">Ordenar por</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliação</option>
            </select>
          </div>
        </div>
        
        {/* Painel de filtros avançados */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Categoria</h3>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Faixa de Preço</h3>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Todos os preços</option>
                  <option value="under100">Menos de R$ 100</option>
                  <option value="100to500">R$ 100 a R$ 500</option>
                  <option value="500to1000">R$ 500 a R$ 1000</option>
                  <option value="over1000">Acima de R$ 1000</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setCategoryFilter('');
                    setPriceFilter('');
                    setSearchQuery('');
                  }}
                  className="text-green-700 hover:text-green-800"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Lista de produtos */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">Nenhum produto encontrado</p>
          <button 
            onClick={() => {
              setCategoryFilter('');
              setPriceFilter('');
              setSearchQuery('');
            }} 
            className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition duration-300"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <Link to={`/product/${product.id}`}>
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Imagem do produto</span>
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h2 className="font-medium text-gray-900 group-hover:text-green-700 transition duration-300 mb-2">
                    {product.name}
                  </h2>
                </Link>
                
                <div className="mb-2">
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                
                <div className="mb-2">
                  {renderRatingStars(product.rating)}
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 line-through text-sm mr-2">
                    R$ {product.oldPrice.toFixed(2)}
                  </span>
                  <span className="font-bold text-gray-900 text-lg">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                
                <button className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;