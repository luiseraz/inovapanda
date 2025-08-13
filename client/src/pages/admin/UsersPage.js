import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminUsersPage = () => {
  // Usuários de exemplo (em um app real, viriam da API)
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'João Silva', 
      email: 'joao.silva@exemplo.com',
      role: 'admin',
      status: 'active',
      lastLogin: '05/06/2025 14:30',
      orders: 8
    },
    { 
      id: 2, 
      name: 'Maria Santos', 
      email: 'maria.santos@exemplo.com',
      role: 'customer',
      status: 'active',
      lastLogin: '04/06/2025 09:15',
      orders: 5
    },
    { 
      id: 3, 
      name: 'Pedro Oliveira', 
      email: 'pedro.oliveira@exemplo.com',
      role: 'customer',
      status: 'active',
      lastLogin: '03/06/2025 16:45',
      orders: 3
    },
    { 
      id: 4, 
      name: 'Ana Costa', 
      email: 'ana.costa@exemplo.com',
      role: 'customer',
      status: 'inactive',
      lastLogin: '25/05/2025 10:20',
      orders: 1
    },
    { 
      id: 5, 
      name: 'Lucas Ferreira', 
      email: 'lucas.ferreira@exemplo.com',
      role: 'customer',
      status: 'active',
      lastLogin: '01/06/2025 08:30',
      orders: 7
    },
    { 
      id: 6, 
      name: 'Juliana Lima', 
      email: 'juliana.lima@exemplo.com',
      role: 'admin',
      status: 'active',
      lastLogin: '05/06/2025 11:45',
      orders: 0
    }
  ]);
  
  // Estados para filtros e busca
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Função para lidar com a exclusão de um usuário
  const handleDeleteUser = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  // Função para alternar o status do usuário
  const handleToggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { 
          ...user, 
          status: user.status === 'active' ? 'inactive' : 'active' 
        };
      }
      return user;
    }));
  };
  
  // Função para alterar o papel do usuário
  const handleChangeRole = (id, newRole) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, role: newRole };
      }
      return user;
    }));
  };
  
  // Filtragem de usuários
  const filteredUsers = users.filter(user => {
    // Filtro de busca
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    
    // Filtro de papel
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    
    // Filtro de status
    const matchesStatus = statusFilter === '' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  // Função para renderizar o indicador de status com cores
  const renderStatus = (status) => {
    let color;
    let label;
    
    switch (status) {
      case 'active':
        color = 'bg-green-100 text-green-800';
        label = 'Ativo';
        break;
      case 'inactive':
        color = 'bg-red-100 text-red-800';
        label = 'Inativo';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
        label = status;
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };
  
  // Função para renderizar o papel do usuário com cores
  const renderRole = (role) => {
    let color;
    let label;
    
    switch (role) {
      case 'admin':
        color = 'bg-purple-100 text-purple-800';
        label = 'Administrador';
        break;
      case 'customer':
        color = 'bg-blue-100 text-blue-800';
        label = 'Cliente';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
        label = role;
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
        <Link 
          to="/admin/users/new" 
          className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300"
        >
          Adicionar Usuário
        </Link>
      </div>
      
      {/* Filtros e busca */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Buscar Usuário
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome ou email..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          
          <div>
            <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Papel
            </label>
            <select
              id="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Todos os papéis</option>
              <option value="admin">Administrador</option>
              <option value="customer">Cliente</option>
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
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Lista de usuários */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papel
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Login
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedidos
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-500 font-medium">
                            {user.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{renderRole(user.role)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{renderStatus(user.status)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.lastLogin}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.orders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link to={`/admin/users/edit/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Editar
                        </Link>
                        
                        <div className="relative group">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Ações
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <button 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.status === 'active' ? 'Desativar Usuário' : 'Ativar Usuário'}
                            </button>
                            
                            {user.role === 'customer' && (
                              <button 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleChangeRole(user.id, 'admin')}
                              >
                                Tornar Administrador
                              </button>
                            )}
                            
                            {user.role === 'admin' && (
                              <button 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleChangeRole(user.id, 'customer')}
                              >
                                Tornar Cliente
                              </button>
                            )}
                            
                            <button 
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Excluir Usuário
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

export default AdminUsersPage; 