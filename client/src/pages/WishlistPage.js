import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Produto adicionado ao carrinho');
  };
  
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <FaHeart className="me-2 text-danger" />
          Minha Lista de Desejos
        </h1>
        
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={clearWishlist}
          >
            Limpar Lista
          </Button>
        )}
      </div>
      
      {wishlistItems.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <FaHeart size={60} className="text-muted mb-3" />
            <h2>Sua lista de desejos está vazia</h2>
            <p className="text-muted mb-4">
              Adicione produtos à sua lista de desejos para guardá-los para compras futuras.
            </p>
            <Link to="/products" className="btn btn-primary">
              Explorar Produtos
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <>
          <p className="text-muted mb-4">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'produto' : 'produtos'} na sua lista de desejos
          </p>
          
          <Row>
            {wishlistItems.map((item) => (
              <Col key={item._id} lg={3} md={4} sm={6} className="mb-4">
                <Card className="h-100 product-card shadow-sm">
                  <Link to={`/product/${item._id}`}>
                    <div className="product-image-container">
                      <Card.Img 
                        variant="top" 
                        src={item.image} 
                        alt={item.name}
                        className="product-image"
                      />
                    </div>
                  </Link>
                  
                  <Card.Body className="d-flex flex-column">
                    <Link to={`/product/${item._id}`} className="text-decoration-none">
                      <Card.Title className="product-title">{item.name}</Card.Title>
                    </Link>
                    
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={16}
                          color={i < item.rating ? '#695953' : '#e4e5e9'}
                        />
                      ))}
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold">R$ {item.price.toFixed(2)}</span>
                      <small className="text-muted">
                        Adicionado em {new Date(item.addedAt).toLocaleDateString()}
                      </small>
                    </div>
                    
                    <div className="d-flex gap-2 mt-3">
                      <Button
                        variant="primary"
                        className="flex-grow-1"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaShoppingCart className="me-1" />
                        Adicionar
                      </Button>
                      
                      <Button
                        variant="outline-danger"
                        onClick={() => removeFromWishlist(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default WishlistPage; 