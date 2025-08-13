import React from 'react';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  // Dados de exemplo (em um app real, viriam da API)
  const orders = [
    {
      id: '12345',
      date: '05/06/2025',
      total: 2799.98,
      status: 'Entregue',
      items: 3
    },
    {
      id: '12344',
      date: '28/05/2025',
      total: 1299.99,
      status: 'Em transporte',
      items: 1
    },
    {
      id: '12343',
      date: '15/05/2025',
      total: 449.98,
      status: 'Processando',
      items: 2
    },
    {
      id: '12342',
      date: '03/05/2025',
      total: 899.99,
      status: 'Entregue',
      items: 1
    }
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 mb-4">Você ainda não fez nenhum pedido</p>
            <Link to="/products" className="inline-block bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition duration-300">
              Começar a comprar
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
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
                    Itens
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.items} {order.items > 1 ? 'itens' : 'item'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/order/${order.id}`} className="text-green-700 hover:text-green-800">
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage; 