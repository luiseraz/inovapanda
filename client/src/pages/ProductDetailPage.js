import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaTruck, FaShieldAlt, FaUndo, FaHeart, FaShareAlt } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Em um app real, buscaríamos o produto da API usando o ID
  // Produto de exemplo
  const product = {
    id: id || '1',
    name: 'Smartphone XTech Pro',
    price: 2499.99,
    oldPrice: 2999.99,
    discount: 17,
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    images: ['/placeholder.png', '/placeholder.png', '/placeholder.png'],
    category: 'Smartphones',
    sku: 'SM-XT-PRO-128',
    description: 'O XTech Pro é o smartphone mais avançado da nossa linha, combinando tecnologia de ponta com design premium. Com processador octa-core, 8GB de RAM e 128GB de armazenamento, este dispositivo oferece desempenho excepcional para todas as suas necessidades.',
    features: [
      'Tela AMOLED de 6.5" com resolução Full HD+',
      'Processador octa-core de 2.8GHz',
      '8GB de RAM e 128GB de armazenamento',
      'Câmera traseira tripla de 64MP + 12MP + 8MP',
      'Câmera frontal de 32MP para selfies perfeitas',
      'Bateria de 5000mAh com carregamento rápido',
      'Android 13 com interface personalizada',
      'Sensor de impressão digital na tela',
      'Resistência à água e poeira (IP68)'
    ],
    specifications: {
      Processador: 'Octa-core 2.8GHz',
      Memória: '8GB RAM',
      Armazenamento: '128GB (expansível até 1TB)',
      Tela: 'AMOLED 6.5" Full HD+ (2400 x 1080)',
      'Câmera Traseira': 'Tripla: 64MP (principal) + 12MP (ultra-wide) + 8MP (teleobjetiva)',
      'Câmera Frontal': '32MP',
      Bateria: '5000mAh',
      'Sistema Operacional': 'Android 13',
      Dimensões: '158.6 x 74.8 x 8.9 mm',
      Peso: '189g'
    },
    relatedProducts: [
      { id: 2, name: 'Fone de Ouvido Wireless', price: 299.99, image: '/placeholder.png' },
      { id: 3, name: 'Smart Watch Series 5', price: 899.99, image: '/placeholder.png' },
      { id: 5, name: 'Carregador Sem Fio 15W', price: 149.99, image: '/placeholder.png' }
    ]
  };
  
  // Estados para controlar a imagem selecionada
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Função para aumentar a quantidade
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  // Função para diminuir a quantidade
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Função para adicionar ao carrinho
  const addToCart = () => {
    console.log(`Adicionando ${quantity} unidade(s) do produto ${product.id} ao carrinho`);
    // Aqui seria implementada a lógica para adicionar ao carrinho (Redux, Context API, etc)
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
    <div className="container-custom mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link to="/products" className="text-green-700 hover:text-green-800">
          ← Voltar para Produtos
        </Link>
      </div>
      
      {/* Seção principal - Imagens e informações do produto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Galeria de imagens */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className="h-80 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Imagem do produto</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`bg-gray-100 rounded border-2 h-20 ${
                  selectedImage === index ? 'border-green-700' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="h-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Img {index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Informações do produto */}
        <div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                {renderRatingStars(product.rating)}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviewCount} avaliações)
                </span>
              </div>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-gray-400 line-through text-lg mr-2">
                R$ {product.oldPrice.toFixed(2)}
              </span>
              <span className="font-bold text-green-700 text-3xl">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Em até 12x de R$ {(product.price / 12).toFixed(2)} sem juros
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center text-sm mb-2">
              <FaTruck className="text-green-700 mr-2" />
              <span>
                <strong>Frete grátis</strong> para compras acima de R$ 299
              </span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`mr-2 ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>●</span>
              <span>
                {product.stock > 0 
                  ? `${product.stock} unidades em estoque` 
                  : 'Produto indisponível'}
              </span>
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <div className="flex items-center">
              <button 
                onClick={decreaseQuantity}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l-md hover:bg-gray-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > 0 && value <= product.stock) {
                    setQuantity(value);
                  }
                }}
                min="1"
                max={product.stock}
                className="w-16 text-center py-2 border-t border-b border-gray-300"
              />
              <button 
                onClick={increaseQuantity}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-r-md hover:bg-gray-300"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex space-x-4 mb-8">
            <button
              onClick={addToCart}
              className="flex-1 bg-green-700 text-white py-3 px-6 rounded-md hover:bg-green-800 transition duration-300 flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Adicionar ao carrinho
            </button>
            
            <button className="bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300">
              <FaHeart />
            </button>
            
            <button className="bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300">
              <FaShareAlt />
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <FaShieldAlt className="text-green-700 mr-2" />
              <span className="font-medium">Garantia de 12 meses</span>
            </div>
            <div className="flex items-center">
              <FaUndo className="text-green-700 mr-2" />
              <span className="font-medium">30 dias para devolução</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abas de informações do produto */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="border-b">
          <div className="flex">
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'description' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Descrição
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'specifications' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Especificações
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'features' 
                  ? 'text-green-700 border-b-2 border-green-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('features')}
            >
              Características
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' && (
            <p className="text-gray-700">{product.description}</p>
          )}
          
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <span className="font-medium">{key}:</span> {value}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'features' && (
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Produtos relacionados */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {product.relatedProducts.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <Link to={`/product/${item.id}`}>
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Imagem do produto</span>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-green-700 transition duration-300 mb-2">
                    {item.name}
                  </h3>
                  <span className="font-bold text-gray-900">
                    R$ {item.price.toFixed(2)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 