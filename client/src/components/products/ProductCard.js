import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaBalanceScale } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToComparison, isInComparison } = useComparison();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success('Produto adicionado ao carrinho');
  };
  
  const toggleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleAddToComparison = (e) => {
    e.preventDefault();
    if (!isInComparison(product._id)) {
      const success = addToComparison(product);
      if (success) {
        toast.success('Produto adicionado à comparação');
      }
    } else {
      toast.error('Este produto já está na comparação');
    }
  };
  
  return (
    <Card className="h-100 product-card shadow-sm">
      {product.isNew && (
        <Badge 
          bg="primary" 
          className="position-absolute" 
          style={{ top: '10px', left: '10px' }}
        >
          Novo
        </Badge>
      )}
      
      {product.discountPrice && (
        <Badge 
          bg="success" 
          className="position-absolute" 
          style={{ top: '10px', right: '10px' }}
        >
          {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
        </Badge>
      )}
      
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <Card.Img 
          variant="top" 
          src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/300x200/6B7280/FFFFFF?text=Imagem+do+Produto'} 
          alt={product.name}
          style={{ height: '200px', objectFit: 'contain' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/6B7280/FFFFFF?text=Imagem+do+Produto';
          }}
        />
      </Link>
      
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title className="product-title">{product.name}</Card.Title>
        </Link>
        
        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={16}
              color={i < product.rating ? '#695953' : '#e4e5e9'}
            />
          ))}
          <small className="text-muted ms-1">({product.numReviews})</small>
        </div>
        
        <div className="mb-3">
          {product.discountPrice ? (
            <>
              <span className="text-muted text-decoration-line-through me-2">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="fw-bold text-danger">
                R$ {product.discountPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="fw-bold">
              R$ {product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-auto d-flex gap-2">
          <Button
            variant="primary"
            className="flex-grow-1"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            <FaShoppingCart className="me-1" />
            {product.countInStock > 0 ? 'Comprar' : 'Indisponível'}
          </Button>
          
          <Button
            variant={isInWishlist(product._id) ? "danger" : "outline-danger"}
            onClick={toggleWishlist}
            title={isInWishlist(product._id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <FaHeart />
          </Button>
          
          <Button
            variant={isInComparison(product._id) ? "info" : "outline-secondary"}
            onClick={handleAddToComparison}
            title={isInComparison(product._id) ? "Produto na comparação" : "Adicionar à comparação"}
          >
            <FaBalanceScale />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard; 