import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaCreditCard, FaBarcode, FaMoneyBill } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container-custom mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre a empresa */}
          <div>
            <h3 className="text-lg font-bold mb-4">InovaPanda</h3>
            <p className="text-gray-600 mb-4">
              Sua loja online de eletrônicos e gadgets importados com as melhores ofertas e novidades do mundo da tecnologia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-700 transition duration-300">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-700 transition duration-300">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-700 transition duration-300">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-700 transition duration-300">
                <FaYoutube size={22} />
              </a>
            </div>
          </div>
          
          {/* Links rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Cadastrar
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Ajuda e suporte */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ajuda e Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Política de Envio
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-green-700 transition duration-300">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> contato@inovapanda.com
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Telefone:</span> (11) 3456-7890
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Atendimento:</span> Seg-Sex, 9h-18h
              </li>
            </ul>
            
            <h3 className="text-lg font-bold mt-6 mb-4">Formas de Pagamento</h3>
            <div className="flex space-x-3">
              <FaCreditCard size={24} className="text-gray-500" />
              <FaBarcode size={24} className="text-gray-500" />
              <FaMoneyBill size={24} className="text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} InovaPanda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;