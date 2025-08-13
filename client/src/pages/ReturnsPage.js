import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaUndo, FaExchangeAlt, FaRegClock, FaShieldAlt, FaInfoCircle, FaClipboardList } from 'react-icons/fa';

const ReturnsPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <FaExchangeAlt size={60} className="text-primary mb-4" />
          <h1 className="mb-3">Política de Devoluções</h1>
          <p className="lead text-muted">
            Conheça nossos procedimentos para devoluções, trocas e reembolsos.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Alert variant="info" className="d-flex align-items-center mb-4">
            <FaInfoCircle className="me-3" size={24} />
            <div>
              <strong>Direito de arrependimento:</strong> De acordo com o Código de Defesa do Consumidor, você tem até 7 dias corridos após o recebimento do produto para solicitar a devolução ou troca.
            </div>
          </Alert>

          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Política de Devolução</h3>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaUndo className="text-primary me-3" size={24} />
                  <h4 className="mb-0">Devolução por Arrependimento</h4>
                </div>
                <p>
                  Caso não esteja satisfeito com a sua compra, você pode solicitar a devolução em até 7 dias corridos após o recebimento do produto, desde que o mesmo esteja:
                </p>
                <ul>
                  <li>Na embalagem original e sem sinais de uso</li>
                  <li>Com todos os acessórios e manuais</li>
                  <li>Acompanhado da nota fiscal</li>
                  <li>Sem danos causados por mau uso</li>
                </ul>
                <p>
                  Após a aprovação da devolução, o valor será reembolsado na mesma forma de pagamento utilizada na compra em até 10 dias úteis.
                </p>
              </div>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaShieldAlt className="text-primary me-3" size={24} />
                  <h4 className="mb-0">Devolução por Defeito</h4>
                </div>
                <p>
                  Em caso de produtos com defeito de fabricação, você pode solicitar a devolução ou troca em até 30 dias após o recebimento. Nosso time técnico irá avaliar o produto para confirmar se o defeito é realmente de fabricação.
                </p>
                <p>
                  Se confirmado o defeito, você pode optar por:
                </p>
                <ul>
                  <li>Troca por um produto igual</li>
                  <li>Devolução do valor pago</li>
                  <li>Reparo do produto (quando possível)</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Como Solicitar uma Devolução</h3>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaClipboardList className="text-primary me-3" size={24} />
                  <h4 className="mb-0">Passo a Passo</h4>
                </div>
                <ol>
                  <li className="mb-2">Acesse sua conta no site e vá para "Meus Pedidos"</li>
                  <li className="mb-2">Encontre o pedido que deseja devolver e clique em "Solicitar Devolução"</li>
                  <li className="mb-2">Selecione o motivo da devolução e forneça detalhes adicionais, se necessário</li>
                  <li className="mb-2">Envie fotos do produto, caso solicitado</li>
                  <li className="mb-2">Aguarde a análise do nosso time (até 48 horas)</li>
                  <li className="mb-2">Após aprovação, você receberá instruções para envio do produto</li>
                  <li className="mb-2">Envie o produto conforme as instruções</li>
                  <li className="mb-2">Após recebermos e validarmos o produto, o reembolso será processado</li>
                </ol>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <FaRegClock className="text-primary me-3" size={24} />
                <p className="mb-0">
                  <strong>Importante:</strong> O prazo para análise da solicitação é de até 48 horas úteis. O prazo para reembolso após o recebimento do produto é de até 10 dias úteis, dependendo da forma de pagamento.
                </p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Custos de Envio para Devolução</h3>
              
              <div className="d-flex align-items-start mb-4">
                <FaInfoCircle className="text-primary me-3 mt-1" size={24} />
                <div>
                  <p>Os custos de envio para devolução são de responsabilidade:</p>
                  <ul>
                    <li><strong>Do Cliente:</strong> Em caso de desistência da compra ou arrependimento</li>
                    <li><strong>Da InovaPanda:</strong> Em caso de defeito de fabricação, produto diferente do anunciado ou dano durante o transporte</li>
                  </ul>
                  <p>
                    Quando a devolução for por responsabilidade da InovaPanda, enviaremos um código de postagem para devolução sem custos.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4">Exclusões da Política de Devolução</h3>
              
              <p>Nossa política de devolução não se aplica aos seguintes casos:</p>
              
              <ul>
                <li className="mb-2">Produtos personalizados ou sob medida</li>
                <li className="mb-2">Produtos com lacre de segurança violado</li>
                <li className="mb-2">Produtos com sinais de uso excessivo ou mau uso</li>
                <li className="mb-2">Produtos sem a embalagem original e acessórios</li>
                <li className="mb-2">Produtos adquiridos em promoções específicas que mencionem a não aplicação da política de devolução</li>
              </ul>
              
              <Alert variant="secondary" className="mt-4">
                <p className="mb-0">
                  Para mais informações ou esclarecimentos sobre nossa política de devolução, entre em contato com nosso suporte pelo e-mail <a href="mailto:contato@inovapanda.com">contato@inovapanda.com</a> ou pelo telefone (11) 3456-7890.
                </p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReturnsPage; 