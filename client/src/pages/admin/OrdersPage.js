import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminOrdersPage = () => {
  // Pedidos de exemplo (em um app real, viriam da API)
  const [orders, setOrders] = useState([
    { 
      id: '12345', 
      customer: 'João Silva', 
      email: 'joao.silva@exemplo.com',
      date: '05/06/2025', 
      total: 2799.98, 
      status: 'Entregue',
      paymentMethod: 'Cartão de crédito',
      items: 3
    },
    { 
      id: '12344', 
      customer: 'Maria Santos', 
      email: 'maria.santos@exemplo.com',
      date: '05/06/2025', 
      total: 1599.99, 
      status: 'Em transporte',
      paymentMethod: 'Cartão de crédito',
      items: 2
    },
    { 
      id: '12343', 
      customer: 'Pedro Oliveira', 
      email: 'pedro.oliveira@exemplo.com',
      date: '04/06/2025', 
      total: 499.98, 
      status: 'Processando',
      paymentMethod: 'Boleto',
      items: 1
    },
    { 
      id: '12342', 
      customer: 'Ana Costa', 
      email: 'ana.costa@exemplo.com',
      date: '04/06/2025', 
      total: 1299.99, 
      status: 'Processando',
      paymentMethod: 'Pix',
      items: 1
    },
    { 
      id: '12341', 
      customer: 'Lucas Ferreira', 
      email: 'lucas.ferreira@exemplo.com',
      date: '03/06/2025', 
      total: 799.97, 
      status: 'Entregue',
      paymentMethod: 'Cartão de crédito',
      items: 3
    },
    { 
      id: '12340', 
      customer: 'Juliana Lima', 
      email: 'juliana.lima@exemplo.com',
      date: '02/06/2025', 
      total: 349.98, 
      status: 'Cancelado',
      paymentMethod: 'Cartão de crédito',
      items: 2
    }
  ]);
  
  // Estados para filtros e busca
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  
  // Função para renderizar o indicador de status com cores
  const renderStatus = (status) => {
    let color;
    switch (status) {
      case 'Entregue':
        color = 'bg-green-100 text-green-800';
        break;
      case 'Em transporte':
        color = 'bg-blue-100 text-blue-800';
        break;
      case 'Processando':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Cancelado':
        color = 'bg-red-100 text-red-800';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {status}
      </span>
    );
  };
  
  // Função para atualizar o status de um pedido
  const handleUpdateStatus = (id, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === id) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };
  
  // Filtragem de pedidos
  const filteredOrders = orders.filter(order => {
    // Filtro de busca
    const matchesSearch = 
      order.id.includes(search) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
    
    // Filtro de status
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    
    // Filtro de data (simplificado para esse exemplo)
    const matchesDate = dateFilter === '' || order.date.includes(dateFilter);
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gerenciar Pedidos</h1>
      
      {/* Filtros e busca */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Buscar Pedido
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ID, cliente ou email..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
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
              <option value="Processando">Processando</option>
              <option value="Em transporte">Em transporte</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Data
            </label>
            <input
              type="text"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="DD/MM/AAAA"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>
      </div>
      
      {/* Lista de pedidos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">R$ {order.total.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{order.items} {order.items > 1 ? 'itens' : 'item'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{renderStatus(order.status)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link to={`/admin/orders/${order.id}`} className="text-green-700 hover:text-green-800">
                          Detalhes
                        </Link>
                        <div className="relative group">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Atualizar
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <button 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleUpdateStatus(order.id, 'Processando')}
                            >
                              Marcar como Processando
                            </button>
                            <button 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleUpdateStatus(order.id, 'Em transporte')}
                            >
                              Marcar como Em transporte
                            </button>
                            <button 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleUpdateStatus(order.id, 'Entregue')}
                            >
                              Marcar como Entregue
                            </button>
                            <button 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleUpdateStatus(order.id, 'Cancelado')}
                            >
                              Marcar como Cancelado
                            </button>
                          </div>
                        </div>
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

export default AdminOrdersPage; 