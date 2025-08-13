import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { FaStar, FaUser } from 'react-icons/fa';

const ReviewsList = ({ reviews = [] }) => {
  // Formatar data
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">Este produto ainda não possui avaliações.</p>
      </div>
    );
  }
  
  return (
    <div className="reviews-list">
      <h4 className="mb-3">Avaliações dos Clientes</h4>
      
      <div className="mb-3">
        <div className="bg-light p-3 rounded mb-4">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">
                Classificação Média: 
                <span className="ms-2 fw-bold">
                  {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
                </span>
              </h5>
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
                  return (
                    <FaStar
                      key={i}
                      size={20}
                      color={ratingValue <= averageRating ? '#695953' : '#e4e5e9'}
                      style={{ marginRight: '2px' }}
                    />
                  );
                })}
                <span className="ms-2 text-muted">({reviews.length} avaliações)</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      
      <ListGroup variant="flush" className="border rounded">
        {reviews.map((review) => (
          <ListGroup.Item key={review._id} className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-light p-2 me-2">
                  <FaUser className="text-secondary" />
                </div>
                <span className="fw-bold">{review.name}</span>
              </div>
              <small className="text-muted">{formatDate(review.createdAt)}</small>
            </div>
            
            <div className="mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  color={i < review.rating ? '#695953' : '#e4e5e9'}
                  style={{ marginRight: '2px' }}
                />
              ))}
            </div>
            
            <p className="mb-0">{review.comment}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ReviewsList; 