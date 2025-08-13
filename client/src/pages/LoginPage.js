import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirecionar se o usuário já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = location.state?.from?.pathname || '/';
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, location]);

  // Atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validar formulário
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Enviar requisição de login
    const result = await login(formData);
    
    if (!result.success) {
      setAlertMessage(result.message);
      setShowAlert(true);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">
              <FaSignInAlt className="me-2" />
              Login
            </h2>

            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Seu email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um email válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Sua senha"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  A senha deve ter pelo menos 6 caracteres.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Entrar
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p>
                Não tem uma conta?{' '}
                <Link to="/register" className="text-decoration-none">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage; 