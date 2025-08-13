import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
  // Dados do carrinho (em um app real, viriam do estado global)
  const [cartItems, setCartItems] = useState([
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
  ]);
  
  // Funções para manipular os itens do carrinho
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Cálculos para o resumo do pedido
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 300 ? 0 : 25;
  const total = subtotal + shipping;
  
  return (
    <div className="container-custom mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <FaShoppingCart size={64} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-6">
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          </p>
          <Link
            to="/products"
            className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition duration-300"
          >
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de produtos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-400 text-xs">Imagem</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <Link to={`/product/${item.id}`} className="hover:text-green-700">
                                {item.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        R$ {item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <Link to="/products" className="text-green-700 hover:text-green-800 flex items-center">
                <FaArrowLeft className="mr-2" />
                Continuar Comprando
              </Link>
            </div>
          </div>
          
          {/* Resumo do pedido */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-4">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-b pb-4">
                  <span>Frete</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-700">Grátis</span>
                    ) : (
                      `R$ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                
                {shipping > 0 && (
                  <div className="text-sm text-gray-500 mt-2">
                    Falta R$ {(300 - subtotal).toFixed(2)} para frete grátis
                  </div>
                )}
              </div>
              
              <Link
                to="/checkout"
                className="mt-6 w-full bg-green-700 text-white py-3 px-4 rounded-md hover:bg-green-800 transition duration-300 flex items-center justify-center"
              >
                Finalizar Compra
              </Link>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Aceitamos várias formas de pagamento</p>
                <p className="mt-1">Compra 100% segura</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 