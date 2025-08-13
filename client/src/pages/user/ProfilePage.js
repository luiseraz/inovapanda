import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaUser, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Brasil'
    }
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [alertMessage, setAlertMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'Brasil'
        }
      });
    }
  }, [user]);

  // Atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Verificar se é um campo de endereço
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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

    // Verificar se as senhas coincidem (apenas se foram preenchidas)
    if (formData.password && formData.password !== formData.confirmPassword) {
      setAlertType('danger');
      setAlertMessage('As senhas não coincidem');
      setShowAlert(true);
      return;
    }

    // Preparar dados para atualização
    const updateData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };

    // Adicionar senha apenas se foi informada
    if (formData.password) {
      updateData.password = formData.password;
    }

    // Enviar requisição de atualização
    const result = await updateProfile(updateData);
    
    if (result.success) {
      setAlertType('success');
      setAlertMessage('Perfil atualizado com sucesso!');
      setShowAlert(true);
      setIsEditing(false);
    } else {
      setAlertType('danger');
      setAlertMessage(result.message);
      setShowAlert(true);
    }
  };

  // Alternar modo de edição
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setValidated(false);
    setShowAlert(false);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">
                  <FaUser className="me-2" />
                  Meu Perfil
                </h3>
                <Button 
                  variant={isEditing ? "outline-light" : "light"} 
                  size="sm" 
                  onClick={toggleEditMode}
                >
                  <FaEdit className="me-1" />
                  {isEditing ? 'Cancelar Edição' : 'Editar Perfil'}
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
                  {alertMessage}
                </Alert>
              )}

              {isEditing ? (
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome completo</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor, informe seu nome.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor, informe um email válido.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Nova Senha (opcional)</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          minLength={6}
                        />
                        <Form.Text className="text-muted">
                          Deixe em branco para manter a senha atual.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                          A senha deve ter pelo menos 6 caracteres.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirmar Nova Senha</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </Form.Group>

                  <h5 className="mt-4 mb-3">Endereço</h5>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="street">
                        <Form.Label>Rua/Av</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
                          placeholder="Rua, número, complemento"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="city">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="state">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleChange}
                          maxLength={2}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="zipCode">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleChange}
                          placeholder="00000-000"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2 mt-4">
                    <Button variant="primary" type="submit">
                      Salvar Alterações
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <Row className="mb-4">
                    <Col md={6}>
                      <h5 className="text-muted mb-3">Informações Pessoais</h5>
                      <p><strong>Nome:</strong> {user.name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Telefone:</strong> {user.phone || 'Não informado'}</p>
                    </Col>
                    <Col md={6}>
                      <h5 className="text-muted mb-3">Endereço</h5>
                      {user.address?.street ? (
                        <>
                          <p><strong>Rua/Av:</strong> {user.address.street}</p>
                          <p><strong>Cidade:</strong> {user.address.city}</p>
                          <p><strong>Estado:</strong> {user.address.state}</p>
                          <p><strong>CEP:</strong> {user.address.zipCode}</p>
                        </>
                      ) : (
                        <p>Nenhum endereço cadastrado</p>
                      )}
                    </Col>
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage; 