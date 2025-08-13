import React from 'react';
import { Container, Row, Col, Table, Card, Button, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaBalanceScale, FaStar } from 'react-icons/fa';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ComparisonPage = () => {
  const { comparisonItems, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();
  
  // Adicionar ao carrinho
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Produto adicionado ao carrinho');
  };
  
  // Renderizar estrelas de avaliação
  const renderStars = (rating) => {
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={16}
            color={i < rating ? '#695953' : '#e4e5e9'}
          />
        ))}
      </div>
    );
  };
  
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <FaBalanceScale className="me-2" />
          Comparação de Produtos
        </h1>
        
        <div>
          <Link to="/products" className="btn btn-outline-primary me-2">
            <FaArrowLeft className="me-2" />
            Continuar Comprando
          </Link>
          
          {comparisonItems.length > 0 && (
            <Button 
              variant="outline-danger" 
              onClick={clearComparison}
            >
              <FaTrash className="me-2" />
              Limpar Comparação
            </Button>
          )}
        </div>
      </div>
      
      {comparisonItems.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <FaBalanceScale size={60} className="text-muted mb-3" />
            <h2>Nenhum produto para comparar</h2>
            <p className="text-muted mb-4">
              Adicione produtos à comparação para visualizar suas diferenças e semelhanças.
            </p>
            <Link to="/products" className="btn btn-primary">
              Explorar Produtos
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <div className="comparison-table-container">
          <div className="table-responsive">
            <Table bordered className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Características</th>
                  {comparisonItems.map(item => (
                    <th key={item._id} className="text-center">
                      <div className="d-flex flex-column align-items-center">
                        <div className="position-relative mb-2">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                          />
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="position-absolute top-0 end-0"
                            onClick={() => removeFromComparison(item._id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                        <Link to={`/product/${item._id}`} className="product-name fw-bold mb-2">
                          {item.name}
                        </Link>
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          {renderStars(item.rating)}
                        </div>
                        <div className="mb-2">
                          <h5 className="mb-0">R$ {item.price.toFixed(2)}</h5>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          className="mb-2"
                          onClick={() => handleAddToCart(item)}
                          disabled={item.countInStock <= 0}
                        >
                          <FaShoppingCart className="me-1" />
                          Comprar
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">Disponibilidade</td>
                  {comparisonItems.map(item => (
                    <td key={item._id} className="text-center">
                      {item.countInStock > 0 ? (
                        <Badge bg="success">Em estoque</Badge>
                      ) : (
                        <Badge bg="danger">Indisponível</Badge>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold">Categoria</td>
                  {comparisonItems.map(item => (
                    <td key={item._id} className="text-center">
                      {item.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold">Marca</td>
                  {comparisonItems.map(item => (
                    <td key={item._id} className="text-center">
                      {item.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold">Descrição</td>
                  {comparisonItems.map(item => (
                    <td key={item._id} className="text-center">
                      <p className="small">{item.description.substring(0, 150)}...</p>
                    </td>
                  ))}
                </tr>
                
                {/* Especificações */}
                <tr className="table-secondary">
                  <td colSpan={comparisonItems.length + 1} className="fw-bold">
                    Especificações Técnicas
                  </td>
                </tr>
                
                {/* Agrupar todas as especificações */}
                {(() => {
                  // Coletar todos os nomes de especificações de todos os produtos
                  const allSpecNames = new Set();
                  comparisonItems.forEach(item => {
                    if (item.specs && item.specs.length > 0) {
                      item.specs.forEach(spec => allSpecNames.add(spec.name));
                    }
                  });
                  
                  // Criar linhas para cada especificação
                  return Array.from(allSpecNames).map(specName => (
                    <tr key={specName}>
                      <td className="fw-bold">{specName}</td>
                      {comparisonItems.map(item => (
                        <td key={item._id} className="text-center">
                          {item.specs && item.specs.find(s => s.name === specName) 
                            ? item.specs.find(s => s.name === specName).value 
                            : '-'}
                        </td>
                      ))}
                    </tr>
                  ));
                })()}
              </tbody>
            </Table>
          </div>
          
          <div className="mt-4">
            <Alert variant="info">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <FaBalanceScale size={30} />
                </div>
                <div>
                  <h5 className="mb-1">Dica de Comparação</h5>
                  <p className="mb-0">Compare até 4 produtos ao mesmo tempo para tomar a melhor decisão de compra. Adicione mais produtos à comparação navegando pela nossa loja.</p>
                </div>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ComparisonPage; 