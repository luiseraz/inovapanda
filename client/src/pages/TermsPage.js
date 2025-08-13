import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaGavel } from 'react-icons/fa';

const TermsPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <FaGavel size={60} className="text-primary mb-4" />
          <h1 className="mb-3">Termos de Uso</h1>
          <p className="lead text-muted">
            Por favor, leia atentamente os termos e condições antes de utilizar nossos serviços.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">1. Aceitação dos Termos</h3>
              <p>
                Ao acessar e utilizar o site da InovaPanda, você concorda em cumprir e estar sujeito a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site ou serviços.
              </p>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento, sendo responsabilidade do usuário verificar periodicamente as atualizações. O uso contínuo do site após a publicação de quaisquer modificações constitui aceitação dessas alterações.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">2. Cadastro e Conta</h3>
              <p>
                Para realizar compras em nosso site, é necessário criar uma conta. Você é responsável por manter a confidencialidade de suas informações de login e por todas as atividades que ocorrerem em sua conta.
              </p>
              <p>
                Ao se cadastrar, você concorda em fornecer informações verdadeiras, precisas, atuais e completas sobre você. A InovaPanda reserva-se o direito de suspender ou encerrar sua conta caso seja verificado que as informações fornecidas são falsas, inexatas ou enganosas.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">3. Uso do Site</h3>
              <p>
                O conteúdo disponibilizado em nosso site, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade da InovaPanda ou de seus fornecedores de conteúdo e está protegido por leis nacionais e internacionais de direitos autorais.
              </p>
              <p>
                Você concorda em utilizar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros. É expressamente proibido:
              </p>
              <ul>
                <li>Utilizar o site para qualquer finalidade ilegal ou não autorizada</li>
                <li>Tentar obter acesso não autorizado a sistemas ou redes conectadas ao site</li>
                <li>Interferir ou interromper o funcionamento do site ou servidores</li>
                <li>Introduzir vírus, trojans, worms ou qualquer outro material malicioso</li>
                <li>Coletar ou rastrear informações pessoais de outros usuários</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">4. Compras e Pagamentos</h3>
              <p>
                Ao efetuar uma compra em nosso site, você declara e garante que possui capacidade legal para realizar a transação e que as informações de pagamento fornecidas são verdadeiras e estão atualizadas.
              </p>
              <p>
                Os preços dos produtos estão sujeitos a alterações sem aviso prévio. A InovaPanda reserva-se o direito de recusar ou cancelar qualquer pedido, seja por erro nos dados do produto, erro no preço, indisponibilidade do produto ou por outros motivos.
              </p>
              <p>
                As formas de pagamento aceitas são aquelas disponibilizadas no momento da compra. A confirmação do pagamento está sujeita à aprovação da administradora do cartão de crédito ou instituição financeira responsável.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">5. Entrega de Produtos</h3>
              <p>
                A entrega dos produtos está sujeita à disponibilidade em estoque e à confirmação do pagamento. Os prazos de entrega são estimados e podem variar conforme a região do país.
              </p>
              <p>
                A InovaPanda não se responsabiliza por atrasos na entrega causados por informações incorretas fornecidas pelo cliente, eventos de força maior, greves, condições climáticas adversas ou outros fatores externos.
              </p>
              <p>
                No momento da entrega, é responsabilidade do cliente verificar as condições da embalagem e do produto. Caso haja alguma irregularidade, o cliente deve recusar o recebimento e entrar em contato imediatamente com nosso serviço de atendimento.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">6. Política de Privacidade</h3>
              <p>
                Nossa Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais. Ao utilizar nosso site, você concorda com as práticas descritas em nossa Política de Privacidade, disponível <a href="/privacy">neste link</a>.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">7. Limitação de Responsabilidade</h3>
              <p>
                A InovaPanda se esforça para fornecer informações precisas e atualizadas sobre seus produtos, porém não garante que o conteúdo do site esteja livre de erros ou imprecisões.
              </p>
              <p>
                Em nenhuma circunstância a InovaPanda, seus diretores, funcionários ou agentes serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes decorrentes do uso ou da incapacidade de usar o site ou os produtos adquiridos.
              </p>
              <p>
                A responsabilidade da InovaPanda está limitada ao valor pago pelo cliente pelo produto adquirido.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">8. Lei Aplicável e Foro</h3>
              <p>
                Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil. Qualquer disputa decorrente ou relacionada a estes Termos será submetida à jurisdição exclusiva dos tribunais da cidade de São Paulo, SP.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4">9. Contato</h3>
              <p>
                Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através do e-mail <a href="mailto:contato@inovapanda.com">contato@inovapanda.com</a> ou pelo telefone (11) 3456-7890.
              </p>
              <p className="text-muted mt-4">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsPage; 