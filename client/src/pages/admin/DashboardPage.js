import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // Dados de exemplo (em um app real, viriam da API)
  const stats = {
    totalSales: 32850.75,
    totalOrders: 147,
    averageOrderValue: 223.47,
    pendingOrders: 15,
    lowStock: 8,
    newCustomers: 23
  };
  
  const recentOrders = [
    { id: '12345', customer: 'João Silva', date: '05/06/2025', total: 2799.98, status: 'Entregue' },
    { id: '12344', customer: 'Maria Santos', date: '05/06/2025', total: 1599.99, status: 'Em transporte' },
    { id: '12343', customer: 'Pedro Oliveira', date: '04/06/2025', total: 499.98, status: 'Processando' },
    { id: '12342', customer: 'Ana Costa', date: '04/06/2025', total: 1299.99, status: 'Processando' },
    { id: '12341', customer: 'Lucas Ferreira', date: '03/06/2025', total: 799.97, status: 'Entregue' }
  ];
  
  const popularProducts = [
    { id: 1, name: 'Smartphone XTech Pro', sales: 32, revenue: 79999.68 },
    { id: 2, name: 'Fone de Ouvido Wireless', sales: 45, revenue: 13499.55 },
    { id: 3, name: 'Smart Watch Series 5', sales: 28, revenue: 25199.72 },
    { id: 4, name: 'Câmera de Segurança WiFi', sales: 21, revenue: 7349.79 }
  ];
  
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
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Vendas Totais</h2>
          <p className="text-3xl font-bold">R$ {stats.totalSales.toLocaleString('pt-BR')}</p>
          <p className="text-green-700 mt-2 text-sm">+12% em relação ao mês passado</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Total de Pedidos</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
          <p className="text-green-700 mt-2 text-sm">+8% em relação ao mês passado</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Valor Médio do Pedido</h2>
          <p className="text-3xl font-bold">R$ {stats.averageOrderValue.toFixed(2)}</p>
          <p className="text-green-700 mt-2 text-sm">+5% em relação ao mês passado</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Pedidos Pendentes</h2>
          <p className="text-3xl font-bold">{stats.pendingOrders}</p>
          <div className="mt-2">
            <Link to="/admin/orders" className="text-green-700 text-sm">Ver todos →</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Produtos com Estoque Baixo</h2>
          <p className="text-3xl font-bold">{stats.lowStock}</p>
          <div className="mt-2">
            <Link to="/admin/products" className="text-green-700 text-sm">Ver todos →</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-gray-500 text-sm uppercase mb-2">Novos Clientes</h2>
          <p className="text-3xl font-bold">{stats.newCustomers}</p>
          <p className="text-green-700 mt-2 text-sm">+15% em relação ao mês passado</p>
        </div>
      </div>
      
      {/* Pedidos recentes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Pedidos Recentes</h2>
          <Link to="/admin/orders" className="text-green-700">Ver todos →</Link>
        </div>
        
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
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">R$ {order.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{renderStatus(order.status)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/orders/${order.id}`} className="text-green-700 hover:text-green-800">
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Produtos mais vendidos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Produtos Mais Vendidos</h2>
          <Link to="/admin/products" className="text-green-700">Ver todos →</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unidades Vendidas
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receita
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {popularProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">{product.sales}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">R$ {product.revenue.toFixed(2)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;