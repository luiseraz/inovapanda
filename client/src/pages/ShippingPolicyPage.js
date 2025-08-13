import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaTruck, FaBox, FaShippingFast, FaGlobeAmericas, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';

const ShippingPolicyPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <FaTruck size={60} className="text-primary mb-4" />
          <h1 className="mb-3">Política de Envio</h1>
          <p className="lead text-muted">
            Conheça todos os detalhes sobre como realizamos as entregas dos nossos produtos.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Opções de Entrega</h3>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaShippingFast className="text-primary me-3" size={24} />
                  <h4 className="mb-0">Entrega Expressa</h4>
                </div>
                <p>
                  Entrega em até 3 dias úteis para as principais capitais do Brasil. 
                  Esta opção tem custo adicional que varia conforme a região de entrega.
                </p>
              </div>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaTruck className="text-primary me-3" size={24} />
                  <h4 className="mb-0">Entrega Padrão</h4>
                </div>
                <p>
                  Entrega em até 7 dias úteis para todo o Brasil. 
                  Esta é nossa opção de entrega mais econômica.
                </p>
              </div>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaBox className="text-primary me-3" size={24} />
                  <h4 className="mb-0">Retirada na Loja</h4>
                </div>
                <p>
                  Disponível apenas para clientes da cidade de São Paulo. 
                  Você pode retirar seu pedido em nossa loja física em até 2 dias úteis após a confirmação do pagamento.
                </p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Prazos de Envio</h3>
              <p>
                Todos os pedidos são processados em até 24 horas após a confirmação do pagamento.
                O prazo de entrega começa a ser contado a partir do envio do produto, não da data da compra.
              </p>
              
              <div className="mt-4">
                <h5>Tabela de Prazos por Região:</h5>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Região</th>
                        <th>Entrega Expressa</th>
                        <th>Entrega Padrão</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sudeste</td>
                        <td>1-3 dias úteis</td>
                        <td>3-5 dias úteis</td>
                      </tr>
                      <tr>
                        <td>Sul</td>
                        <td>2-4 dias úteis</td>
                        <td>4-6 dias úteis</td>
                      </tr>
                      <tr>
                        <td>Centro-Oeste</td>
                        <td>2-4 dias úteis</td>
                        <td>4-7 dias úteis</td>
                      </tr>
                      <tr>
                        <td>Nordeste</td>
                        <td>3-5 dias úteis</td>
                        <td>5-8 dias úteis</td>
                      </tr>
                      <tr>
                        <td>Norte</td>
                        <td>4-6 dias úteis</td>
                        <td>7-12 dias úteis</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-muted small mt-2">
                  * Os prazos podem variar conforme condições climáticas e logísticas locais.
                </p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Frete Grátis</h3>
              <div className="d-flex align-items-center mb-3">
                <FaMoneyBillWave className="text-primary me-3" size={24} />
                <p className="mb-0">
                  Oferecemos <strong>frete grátis</strong> para compras acima de R$ 500,00 na modalidade de entrega padrão.
                  Promoções especiais podem oferecer condições diferenciadas de frete grátis, fique atento às nossas ofertas!
                </p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Rastreamento</h3>
              <p>
                Todos os pedidos são enviados com código de rastreamento. 
                Assim que seu pedido for enviado, você receberá um e-mail com o código de rastreamento e instruções sobre como acompanhar sua entrega.
              </p>
              <p>
                Você também pode acompanhar o status do seu pedido através da área "Meus Pedidos" na sua conta.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-start">
                <FaInfoCircle className="text-primary me-3 mt-1" size={24} />
                <div>
                  <h3 className="mb-3">Informações Importantes</h3>
                  <ul>
                    <li className="mb-2">Não realizamos entregas em caixas postais.</li>
                    <li className="mb-2">O prazo de entrega pode ser estendido durante períodos de alta demanda (Black Friday, Natal, etc).</li>
                    <li className="mb-2">Certifique-se de fornecer um endereço completo e correto para evitar atrasos na entrega.</li>
                    <li className="mb-2">Em caso de ausência no endereço, a transportadora tentará realizar mais duas entregas antes de retornar o produto.</li>
                    <li className="mb-2">Após três tentativas sem sucesso, o pedido retornará ao nosso centro de distribuição e você será contatado.</li>
                    <li className="mb-2">Não nos responsabilizamos por atrasos causados por informações incorretas fornecidas pelo cliente.</li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPolicyPage; 