import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  // Produtos de exemplo (em um app real, viriam da API)
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Smartphone XTech Pro', 
      category: 'Smartphones',
      price: 2499.99,
      stock: 35,
      image: '/placeholder.png',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Fone de Ouvido Wireless', 
      category: 'Acessórios',
      price: 299.99,
      stock: 78,
      image: '/placeholder.png',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Smart Watch Series 5', 
      category: 'Gadgets',
      price: 899.99,
      stock: 12,
      image: '/placeholder.png',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Carregador Sem Fio 15W', 
      category: 'Acessórios',
      price: 149.99,
      stock: 50,
      image: '/placeholder.png',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Câmera de Segurança WiFi', 
      category: 'Smart Home',
      price: 349.99,
      stock: 5,
      image: '/placeholder.png',
      status: 'low_stock'
    },
    { 
      id: 6, 
      name: 'Tablet Ultra Slim', 
      category: 'Tablets',
      price: 1299.99,
      stock: 20,
      image: '/placeholder.png',
      status: 'active'
    },
    { 
      id: 7, 
      name: 'Caixa de Som Bluetooth', 
      category: 'Áudio',
      price: 199.99,
      stock: 0,
      image: '/placeholder.png',
      status: 'out_of_stock'
    }
  ]);
  
  // Estados para filtros e busca
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Função para lidar com a exclusão de um produto
  const handleDeleteProduct = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };
  
  // Filtragem de produtos
  const filteredProducts = products.filter(product => {
    // Filtro de busca
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.category.toLowerCase().includes(search.toLowerCase());
    
    // Filtro de categoria
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    
    // Filtro de status
    const matchesStatus = statusFilter === '' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Lista de categorias únicas para o filtro
  const categories = [...new Set(products.map(product => product.category))];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        <Link 
          to="/admin/products/new" 
          className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300"
        >
          Adicionar Produto
        </Link>
      </div>
      
      {/* Filtros e busca */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Buscar Produto
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome ou categoria..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          
          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Categoria
            </label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="low_stock">Estoque baixo</option>
              <option value="out_of_stock">Fora de estoque</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Lista de produtos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-400 text-xs">Img</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">R$ {product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.status === 'active' && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Ativo
                        </span>
                      )}
                      {product.status === 'low_stock' && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Estoque Baixo
                        </span>
                      )}
                      {product.status === 'out_of_stock' && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Fora de Estoque
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link to={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage; 