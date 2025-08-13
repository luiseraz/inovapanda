import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se o usuário já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Verificar se as senhas coincidem quando o usuário digita a confirmação
    if (name === 'confirmPassword' || name === 'password') {
      const match = name === 'confirmPassword' 
        ? value === formData.password 
        : formData.confirmPassword === value;
      setPasswordMatch(match);
    }
  };

  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Verificar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      setAlertMessage('As senhas não coincidem');
      setShowAlert(true);
      return;
    }

    // Validar formulário
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Enviar requisição de registro
    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
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
              <FaUserPlus className="me-2" />
              Cadastre-se
            </h2>

            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Seu nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe seu nome.
                </Form.Control.Feedback>
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirmar senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirme sua senha"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  isInvalid={!passwordMatch}
                />
                <Form.Control.Feedback type="invalid">
                  As senhas não coincidem.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Cadastrar
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p>
                Já tem uma conta?{' '}
                <Link to="/login" className="text-decoration-none">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage; 