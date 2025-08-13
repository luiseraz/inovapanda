import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-9xl font-bold text-green-700">404</h1>
      <h2 className="text-2xl font-bold mt-6 mb-4">Página não encontrada</h2>
      <p className="text-gray-600 max-w-md mb-8">
        A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition duration-300"
        >
          Voltar para Home
        </Link>
        <Link
          to="/products"
          className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition duration-300"
        >
          Ver Produtos
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 