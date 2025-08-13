import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShieldAlt } from 'react-icons/fa';

const PrivacyPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <FaShieldAlt size={60} className="text-primary mb-4" />
          <h1 className="mb-3">Política de Privacidade</h1>
          <p className="lead text-muted">
            Entenda como coletamos, utilizamos e protegemos suas informações pessoais.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">1. Introdução</h3>
              <p>
                A InovaPanda está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos, transferimos e armazenamos suas informações pessoais.
              </p>
              <p>
                Ao utilizar nosso site ou fornecer seus dados pessoais à InovaPanda, você concorda com os termos e condições desta Política de Privacidade. Se você não concordar com esta Política, por favor, não utilize nosso site ou forneça seus dados pessoais.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">2. Informações que Coletamos</h3>
              <p>
                Podemos coletar os seguintes tipos de informações:
              </p>
              <ul>
                <li className="mb-2">
                  <strong>Informações de Cadastro:</strong> nome completo, e-mail, número de telefone, endereço, CPF/CNPJ, data de nascimento.
                </li>
                <li className="mb-2">
                  <strong>Informações de Pagamento:</strong> número do cartão de crédito, código de segurança, data de validade, nome do titular (essas informações são processadas por gateways de pagamento seguros e não são armazenadas em nossos servidores).
                </li>
                <li className="mb-2">
                  <strong>Informações de Navegação:</strong> endereço IP, tipo de navegador, provedor de internet, páginas de referência/saída, sistema operacional, data/hora e dados de clickstream.
                </li>
                <li className="mb-2">
                  <strong>Informações de Compra:</strong> produtos adquiridos, data da compra, valor, método de pagamento.
                </li>
                <li className="mb-2">
                  <strong>Comunicações:</strong> registros de e-mails, mensagens e outras comunicações trocadas conosco.
                </li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">3. Como Utilizamos suas Informações</h3>
              <p>
                Utilizamos suas informações pessoais para os seguintes fins:
              </p>
              <ul>
                <li className="mb-2">Processar e entregar seus pedidos</li>
                <li className="mb-2">Gerenciar sua conta e fornecer suporte ao cliente</li>
                <li className="mb-2">Personalizar sua experiência de compra</li>
                <li className="mb-2">Enviar comunicações de marketing (com seu consentimento)</li>
                <li className="mb-2">Melhorar nosso site e serviços</li>
                <li className="mb-2">Cumprir obrigações legais e fiscais</li>
                <li className="mb-2">Prevenir fraudes e proteger nossos direitos</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">4. Compartilhamento de Informações</h3>
              <p>
                Podemos compartilhar suas informações pessoais com:
              </p>
              <ul>
                <li className="mb-2">
                  <strong>Parceiros de Serviços:</strong> empresas que nos ajudam a fornecer serviços, como processamento de pagamentos, entrega de produtos, análise de dados e serviços de marketing.
                </li>
                <li className="mb-2">
                  <strong>Autoridades Governamentais:</strong> quando exigido por lei, ordem judicial ou processo legal.
                </li>
                <li className="mb-2">
                  <strong>Parceiros Comerciais:</strong> com seu consentimento, podemos compartilhar informações com parceiros comerciais para oferecer produtos ou serviços que possam ser de seu interesse.
                </li>
              </ul>
              <p>
                Não vendemos ou alugamos suas informações pessoais a terceiros para fins de marketing sem seu consentimento explícito.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">5. Cookies e Tecnologias Semelhantes</h3>
              <p>
                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência em nosso site, personalizar conteúdo, oferecer funcionalidades de redes sociais e analisar o tráfego do site.
              </p>
              <p>
                Você pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie está sendo enviado. No entanto, algumas funcionalidades do site podem não funcionar corretamente sem cookies.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">6. Segurança de Dados</h3>
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações pessoais contra acesso não autorizado, divulgação, alteração e destruição.
              </p>
              <p>
                No entanto, nenhum sistema de segurança é impenetrável e não podemos garantir a segurança absoluta de suas informações. É importante que você também tome precauções para proteger seus dados, como manter suas credenciais de login confidenciais.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">7. Seus Direitos</h3>
              <p>
                Você tem direito a:
              </p>
              <ul>
                <li className="mb-2">Acessar suas informações pessoais</li>
                <li className="mb-2">Corrigir informações imprecisas</li>
                <li className="mb-2">Excluir suas informações pessoais</li>
                <li className="mb-2">Restringir ou opor-se ao processamento de suas informações</li>
                <li className="mb-2">Solicitar a portabilidade de seus dados</li>
                <li className="mb-2">Retirar seu consentimento a qualquer momento</li>
                <li className="mb-2">Apresentar uma reclamação a uma autoridade de proteção de dados</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail <a href="mailto:privacidade@inovapanda.com">privacidade@inovapanda.com</a>.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">8. Retenção de Dados</h3>
              <p>
                Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">9. Transferência Internacional de Dados</h3>
              <p>
                Suas informações pessoais podem ser transferidas e processadas em países diferentes daquele em que você reside. Esses países podem ter leis de proteção de dados diferentes das leis do seu país.
              </p>
              <p>
                Quando transferimos suas informações pessoais para outros países, tomamos medidas para garantir que sejam protegidas adequadamente, em conformidade com esta Política de Privacidade e as leis aplicáveis de proteção de dados.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">10. Alterações na Política de Privacidade</h3>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações em nossas práticas de informação. Recomendamos que você revise esta página regularmente para obter as informações mais recentes sobre nossas práticas de privacidade.
              </p>
              <p>
                A data da última atualização será sempre indicada no final desta Política.
              </p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4">11. Contato</h3>
              <p>
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato conosco:
              </p>
              <ul>
                <li>E-mail: <a href="mailto:privacidade@inovapanda.com">privacidade@inovapanda.com</a></li>
                <li>Telefone: (11) 3456-7890</li>
                <li>Endereço: Av. Paulista, 1000, São Paulo - SP, 01310-100</li>
              </ul>
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

export default PrivacyPage;
