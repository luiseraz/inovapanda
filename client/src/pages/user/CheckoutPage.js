import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  // Estados dos formulários
  const [formData, setFormData] = useState({
    // Informações de envio
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Informações de pagamento
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Outras opções
    saveInfo: false,
    sameAsBilling: true
  });
  
  // Items do carrinho (em um app real, viriam do estado global)
  const cartItems = [
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
      quantity: 2,
      image: '/placeholder.png'
    }
  ];
  
  // Cálculos
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 25.00;
  const total = subtotal + shipping;
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aqui seria feita a requisição para a API e redirecionamento para a página de sucesso
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Finalizar Pedido</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Informações de envio */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Informações de Envio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Salvar informações para futuras compras</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Informações de pagamento */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Informações de Pagamento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                      Número do cartão
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="cardName" className="block text-gray-700 font-medium mb-2">
                      Nome no cartão
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
                      Data de validade
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <Link to="/cart" className="text-green-700 hover:text-green-800 font-medium">
                  ← Voltar para o carrinho
                </Link>
                
                <button
                  type="submit"
                  className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition duration-300"
                >
                  Finalizar Pedido
                </button>
              </div>
            </form>
          </div>
          
          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
              
              <div className="mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex py-2 border-b">
                    <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">Imagem</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex text-sm text-gray-500">
                        <p>Qtd: {item.quantity}</p>
                        <p className="ml-4">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 