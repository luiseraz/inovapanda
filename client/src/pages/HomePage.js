import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa';

const HomePage = () => {
  // Produtos em destaque (em um app real, viriam da API)
  const featuredProducts = [
    {
      id: 1,
      name: 'Smartphone XTech Pro',
      price: 2499.99,
      oldPrice: 2999.99,
      image: '/placeholder.png',
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: 2,
      name: 'Fone de Ouvido Wireless',
      price: 299.99,
      oldPrice: 399.99,
      image: '/placeholder.png',
      rating: 4.6,
      reviewCount: 89
    },
    {
      id: 3,
      name: 'Smart Watch Series 5',
      price: 899.99,
      oldPrice: 1099.99,
      image: '/placeholder.png',
      rating: 4.5,
      reviewCount: 56
    },
    {
      id: 4,
      name: 'Tablet Ultra Slim',
      price: 1299.99,
      oldPrice: 1499.99,
      image: '/placeholder.png',
      rating: 4.7,
      reviewCount: 42
    }
  ];
  
  // Categorias (em um app real, viriam da API)
  const categories = [
    { id: 1, name: 'Smartphones', image: '/placeholder.png', count: 24 },
    { id: 2, name: 'Notebooks', image: '/placeholder.png', count: 18 },
    { id: 3, name: 'Tablets', image: '/placeholder.png', count: 12 },
    { id: 4, name: 'Smartwatches', image: '/placeholder.png', count: 15 },
    { id: 5, name: 'Acessórios', image: '/placeholder.png', count: 36 },
    { id: 6, name: 'Audio', image: '/placeholder.png', count: 28 }
  ];
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <div className="container-custom mx-auto px-4 sm:px-6 py-16">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Tecnologia de ponta para sua vida
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Descubra os gadgets mais inovadores com até 30% de desconto e frete grátis para todo o Brasil
              </p>
              <Link 
                to="/products" 
                className="bg-green-700 text-white py-3 px-8 rounded-md hover:bg-green-800 transition duration-300 inline-flex items-center"
              >
                Ver ofertas
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vantagens */}
      <section className="py-6">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaShippingFast className="text-green-700 text-xl" />
              </div>
              <div>
                <h3 className="font-bold">Entrega Rápida</h3>
                <p className="text-gray-600 text-sm">Receba em até 48h em capitais</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaCreditCard className="text-green-700 text-xl" />
              </div>
              <div>
                <h3 className="font-bold">Pagamento Seguro</h3>
                <p className="text-gray-600 text-sm">Pague em até 12x no cartão</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaHeadset className="text-green-700 text-xl" />
              </div>
              <div>
                <h3 className="font-bold">Suporte 24h</h3>
                <p className="text-gray-600 text-sm">Atendimento online todos os dias</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Produtos em destaque */}
      <section>
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
            <Link to="/products" className="text-green-700 hover:text-green-800 flex items-center">
              Ver todos <FaArrowRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Imagem do produto</span>
                </div>
                
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 group-hover:text-green-700 transition duration-300 mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      ({product.reviewCount} avaliações)
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-gray-400 line-through text-sm mr-2">
                      R$ {product.oldPrice.toFixed(2)}
                    </span>
                    <span className="font-bold text-gray-900">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <button className="mt-4 w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300">
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categorias */}
      <section>
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Navegue por Categorias</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/products?category=${category.name}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300"
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Imagem</span>
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} produtos</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner Promocional */}
      <section className="bg-green-700 text-white py-12 rounded-lg">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Cadastre-se e ganhe 10% OFF</h2>
              <p>Na sua primeira compra + frete grátis para todo o Brasil</p>
            </div>
            <Link 
              to="/register" 
              className="bg-white text-green-700 py-3 px-8 rounded-md hover:bg-gray-100 transition duration-300"
            >
              Cadastrar agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;