import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Por favor, selecione uma classificação');
      return;
    }
    
    if (comment.trim().length < 5) {
      toast.error('O comentário deve ter pelo menos 5 caracteres');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Em uma implementação real, você enviaria isso para o backend
      // const response = await api.post(`/products/${productId}/reviews`, { rating, comment });
      
      // Simulando resposta bem-sucedida
      setTimeout(() => {
        // Criar uma avaliação simulada
        const newReview = {
          _id: Date.now().toString(),
          name: user?.name || 'Usuário',
          rating,
          comment,
          createdAt: new Date().toISOString()
        };
        
        // Chamar a função de callback com a nova avaliação
        onReviewAdded(newReview);
        
        // Limpar o formulário
        setRating(0);
        setComment('');
        
        toast.success('Avaliação adicionada com sucesso!');
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao adicionar avaliação:', error);
      toast.error('Ocorreu um erro ao adicionar sua avaliação');
      setIsSubmitting(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <Card className="p-4 mb-4">
        <p className="mb-0">Faça login para adicionar uma avaliação.</p>
      </Card>
    );
  }
  
  return (
    <Card className="p-4 mb-4">
      <h4 className="mb-3">Adicionar Avaliação</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Classificação</Form.Label>
          <div className="d-flex mb-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <div
                  key={index}
                  style={{ cursor: 'pointer', marginRight: '8px' }}
                  onMouseEnter={() => setHoveredRating(ratingValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(ratingValue)}
                >
                  <FaStar 
                    size={24} 
                    color={ratingValue <= (hoveredRating || rating) ? '#695953' : '#e4e5e9'} 
                  />
                </div>
              );
            })}
          </div>
          <small className="text-muted">
            {rating > 0 ? `Você selecionou ${rating} estrela${rating > 1 ? 's' : ''}` : 'Clique nas estrelas para avaliar'}
          </small>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Comentário</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Compartilhe sua experiência com este produto"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isSubmitting}
          className="w-100"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
        </Button>
      </Form>
    </Card>
  );
};

export default ReviewForm; 