import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Usar o contexto de autenticação
  const { user, logout, isAuthenticated } = useAuth();
  const isAdmin = user && user.role === 'admin';
  
  const navigate = useNavigate();
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container-custom mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-700">InovaPanda</span>
          </Link>
          
          {/* Pesquisa - Visível apenas em telas maiores */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex items-center w-full max-w-md mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-green-700"
              >
                <FaSearch />
              </button>
            </div>
          </form>
          
          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-green-700">
              Produtos
            </Link>
            
            <Link to="/cart" className="text-gray-700 hover:text-green-700 relative">
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center text-gray-700 hover:text-green-700 focus:outline-none"
                >
                  <FaUserCircle size={20} className="mr-1" />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Meu Perfil
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Meus Pedidos
                    </Link>
                    
                    {isAdmin && (
                      <Link 
                        to="/admin/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Painel Admin
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-green-700"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </nav>
          
          {/* Botão de menu mobile */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form 
              onSubmit={handleSearchSubmit} 
              className="mb-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-green-700"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
            
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/products" 
                  className="block text-gray-700 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="flex items-center text-gray-700 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart size={18} className="mr-2" />
                  Carrinho
                  <span className="ml-2 bg-green-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li className="border-t pt-2">
                    <div className="text-gray-500 mb-2">
                      Olá, {user.name.split(' ')[0]}
                    </div>
                  </li>
                  <li>
                    <Link 
                      to="/profile" 
                      className="block text-gray-700 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meu Perfil
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/orders" 
                      className="block text-gray-700 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meus Pedidos
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link 
                        to="/admin/dashboard" 
                        className="block text-gray-700 hover:text-green-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Painel Admin
                      </Link>
                    </li>
                  )}
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center text-gray-700 hover:text-green-700"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block text-gray-700 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="block bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Cadastrar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;