import React from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams();
  
  // Dados do pedido (em um app real, viriam da API)
  const order = {
    id: id || '12345',
    date: '05/06/2025',
    status: 'Entregue',
    paymentMethod: 'Cartão de crédito',
    totalItems: 3,
    subtotal: 2774.98,
    shipping: 25.00,
    total: 2799.98,
    address: {
      name: 'João Silva',
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    items: [
      {
        id: 1,
        name: 'Smartphone XTech Pro',
        price: 2499.99,
        quantity: 1,
        image: '/placeholder.png'
      },
      {
        id: 2,
        name: 'Fone de Ouvido Wireless',
        price: 299.99,
        quantity: 1,
        image: '/placeholder.png'
      },
      {
        id: 3,
        name: 'Cabo USB-C Premium',
        price: 49.99,
        quantity: 1,
        image: '/placeholder.png'
      }
    ],
    timeline: [
      { date: '05/06/2025 14:30', status: 'Pedido entregue', description: 'Seu pedido foi entregue com sucesso' },
      { date: '04/06/2025 09:15', status: 'Em transporte', description: 'Seu pedido está a caminho' },
      { date: '03/06/2025 16:45', status: 'Preparando envio', description: 'Seu pedido está sendo preparado para envio' },
      { date: '02/06/2025 10:20', status: 'Pagamento aprovado', description: 'Seu pagamento foi aprovado' },
      { date: '02/06/2025 10:15', status: 'Pedido recebido', description: 'Recebemos seu pedido e estamos processando' }
    ]
  };

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
      case 'Preparando envio':
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
            <p className="text-gray-600 mt-1">Realizado em {order.date}</p>
          </div>
          <div className="mt-2 md:mt-0">
            {renderStatus(order.status)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detalhes do pedido e itens */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">Itens do Pedido</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantidade
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-400 text-xs">Imagem</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          R$ {item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">Status do Pedido</h2>
              <div className="border-l-2 border-green-600 pl-4 space-y-6">
                {order.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full bg-green-600"></div>
                    <div>
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/orders" className="text-green-700 hover:text-green-800 font-medium">
                ← Voltar para meus pedidos
              </Link>
            </div>
          </div>
          
          {/* Resumo do pedido e informações de envio */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({order.totalItems} itens)</span>
                  <span>R$ {order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>R$ {order.shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium">Método de pagamento</p>
                <p className="text-gray-600">{order.paymentMethod}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Informações de Envio</h2>
              
              <div>
                <p className="font-medium">{order.address.name}</p>
                <p className="text-gray-600">{order.address.street}</p>
                <p className="text-gray-600">
                  {order.address.city}, {order.address.state}, {order.address.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 