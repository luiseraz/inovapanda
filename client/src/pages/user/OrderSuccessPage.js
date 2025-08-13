import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  // Em um app real, o ID do pedido viria da URL ou do estado global
  const orderId = '12345';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Pedido Realizado com Sucesso!</h1>
        <p className="text-gray-600 mb-6">
          Seu pedido #{orderId} foi recebido e está sendo processado.
          Você receberá um e-mail de confirmação em breve.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto mb-8">
          <h2 className="font-bold mb-2">O que acontece agora?</h2>
          <ol className="text-left text-gray-600 space-y-3">
            <li className="flex">
              <span className="bg-green-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
              <span>Nosso time verificará seu pedido</span>
            </li>
            <li className="flex">
              <span className="bg-green-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
              <span>Seu pedido será preparado para envio</span>
            </li>
            <li className="flex">
              <span className="bg-green-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
              <span>Você receberá atualizações sobre o status do envio por e-mail</span>
            </li>
          </ol>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to={`/order/${orderId}`} 
            className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition duration-300"
          >
            Ver Detalhes do Pedido
          </Link>
          <Link 
            to="/" 
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Continuar Comprando
          </Link>
        </div>
        
        <div className="mt-8 text-gray-500">
          <p>Precisa de ajuda com seu pedido?</p>
          <p>Entre em contato com nosso suporte: <a href="mailto:suporte@inovapanda.com" className="text-green-700 hover:text-green-800">suporte@inovapanda.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage; 