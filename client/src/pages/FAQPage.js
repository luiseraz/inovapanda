import React from 'react';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { FaQuestionCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const FAQPage = () => {
  // Lista de perguntas frequentes
  const faqs = [
    {
      question: 'Como faço para realizar uma compra?',
      answer: 'Para realizar uma compra, navegue pelo nosso catálogo de produtos, selecione o item desejado, clique em "Adicionar ao Carrinho" e siga para o checkout. Você pode finalizar sua compra como convidado ou criar uma conta para acompanhar seus pedidos.'
    },
    {
      question: 'Quais são as formas de pagamento disponíveis?',
      answer: 'Aceitamos diversas formas de pagamento, incluindo cartões de crédito (Visa, Mastercard, American Express), boleto bancário, PIX e transferência bancária. Todas as transações são processadas com segurança através de criptografia avançada.'
    },
    {
      question: 'Qual o prazo de entrega dos produtos?',
      answer: 'O prazo de entrega varia conforme a região e o tipo de envio escolhido. Geralmente, enviamos em até 2 dias úteis após a confirmação do pagamento. O prazo estimado é informado durante o processo de checkout antes da finalização da compra.'
    },
    {
      question: 'Como acompanhar meu pedido?',
      answer: 'Você pode acompanhar seu pedido através da área "Meus Pedidos" na sua conta. Também enviamos atualizações por e-mail com o código de rastreamento assim que o produto for enviado.'
    },
    {
      question: 'Qual a política de devolução?',
      answer: 'Você tem até 7 dias após o recebimento do produto para solicitar a devolução ou troca. O produto deve estar em perfeitas condições, na embalagem original e com todos os acessórios. Para iniciar uma devolução, entre em contato com nosso suporte.'
    },
    {
      question: 'Os produtos têm garantia?',
      answer: 'Sim, todos os produtos possuem garantia mínima de 90 dias conforme o Código de Defesa do Consumidor. Alguns produtos possuem garantia estendida oferecida pelo fabricante. As informações específicas sobre garantia são detalhadas na página de cada produto.'
    },
    {
      question: 'Vocês enviam para todo o Brasil?',
      answer: 'Sim, realizamos entregas para todo o território nacional. Os custos e prazos de entrega variam conforme a região e são calculados no momento da finalização da compra.'
    },
    {
      question: 'O que fazer se o produto chegar com defeito?',
      answer: 'Caso receba um produto com defeito, entre em contato com nosso suporte em até 7 dias informando o problema. Envie fotos ou vídeos que demonstrem o defeito para agilizar o processo. Após análise, providenciaremos a troca ou reembolso conforme sua preferência.'
    },
    {
      question: 'Como cancelar um pedido?',
      answer: 'Você pode solicitar o cancelamento do pedido através da área "Meus Pedidos" na sua conta ou entrando em contato com nosso suporte. Pedidos já enviados não podem ser cancelados, mas podem ser devolvidos após o recebimento.'
    },
    {
      question: 'Vocês oferecem frete grátis?',
      answer: 'Sim, oferecemos frete grátis para compras acima de R$ 500,00 para as principais capitais do Brasil. Promoções sazonais também podem incluir frete grátis com condições especiais.'
    }
  ];

  return (
    <Container className="support-page py-5">
      <div className="icon-header">
        <FaQuestionCircle size={60} />
        <h1>Perguntas Frequentes</h1>
        <p className="lead text-muted">
          Encontre respostas para as dúvidas mais comuns sobre nossos produtos, entregas e políticas.
        </p>
      </div>

      <Row className="justify-content-center">
        <Col md={10}>
          <Accordion defaultActiveKey="0" className="shadow-sm">
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <span className="fw-medium">{faq.question}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="mb-0">{faq.answer}</p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={8} className="text-center">
          <Card className="p-4 shadow-sm bg-light border-0">
            <Card.Body>
              <h4 className="mb-3">Não encontrou o que procurava?</h4>
              <p className="mb-4">
                Nossa equipe de suporte está pronta para ajudar com qualquer outra dúvida que você possa ter.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="primary" href="mailto:contato@inovapanda.com">
                  <FaEnvelope className="me-2" />
                  Enviar Email
                </Button>
                <Button variant="outline-primary" href="tel:+551134567890">
                  <FaPhone className="me-2" />
                  Ligar para Suporte
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQPage; 