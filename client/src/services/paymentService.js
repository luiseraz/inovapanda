// Payment Service para processamento de pagamentos
// Este serviço simula uma integração com gateway de pagamento

const PaymentService = {
  // Simular processamento de pagamento com cartão de crédito
  processCardPayment: async (paymentData) => {
    return new Promise((resolve) => {
      // Simulando tempo de processamento
      setTimeout(() => {
        // Simular validação básica dos dados do cartão
        if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
          resolve({
            success: false,
            message: 'Dados do cartão incompletos',
            data: null
          });
          return;
        }

        // Validar número do cartão (simulação básica)
        if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
          resolve({
            success: false,
            message: 'Número do cartão inválido',
            data: null
          });
          return;
        }

        // Simulando aprovação do pagamento (95% de chance de sucesso)
        const isApproved = Math.random() < 0.95;
        
        if (isApproved) {
          resolve({
            success: true,
            message: 'Pagamento aprovado',
            data: {
              transactionId: 'txn_' + Date.now(),
              amount: paymentData.amount,
              currency: 'BRL',
              paymentMethod: 'credit_card',
              status: 'approved',
              date: new Date().toISOString()
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Pagamento recusado pela operadora. Verifique os dados ou tente outro cartão.',
            data: null
          });
        }
      }, 1500); // Simular 1.5 segundos de processamento
    });
  },

  // Simular processamento de pagamento com boleto
  generateBoleto: async (paymentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const boletoCode = '34191.79001 01043.510047 91020.150008 9 86780026000';
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 3); // Vencimento em 3 dias
        
        resolve({
          success: true,
          message: 'Boleto gerado com sucesso',
          data: {
            transactionId: 'bol_' + Date.now(),
            barCode: boletoCode,
            amount: paymentData.amount,
            currency: 'BRL',
            dueDate: dueDate.toISOString(),
            paymentMethod: 'boleto',
            status: 'pending',
            pdfUrl: 'https://example.com/boleto.pdf' // URL fictícia
          }
        });
      }, 1000);
    });
  },

  // Simular processamento de pagamento com PIX
  generatePixPayment: async (paymentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pixKey = 'pix-' + Math.random().toString(36).substr(2, 9);
        
        resolve({
          success: true,
          message: 'Pagamento PIX gerado com sucesso',
          data: {
            transactionId: 'pix_' + Date.now(),
            pixKey: pixKey,
            pixCopyPaste: 'ZqZqfzKtGbS1cLXkQIYy0R2BMJF4NaXr9ZKqyB',
            qrCodeUrl: 'https://example.com/pix-qrcode.png', // URL fictícia
            amount: paymentData.amount,
            currency: 'BRL',
            paymentMethod: 'pix',
            status: 'pending',
            expiresAt: new Date(Date.now() + 30 * 60000).toISOString() // Expira em 30 minutos
          }
        });
      }, 800);
    });
  },

  // Verificar status de um pagamento
  checkPaymentStatus: async (transactionId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Se o ID começar com "pix_" ou "bol_", considere como pendente
        // Se começar com "txn_", considere como aprovado
        let status;
        let statusMessage;
        
        if (transactionId.startsWith('txn_')) {
          status = 'approved';
          statusMessage = 'Pagamento aprovado';
        } else if (transactionId.startsWith('pix_')) {
          // Simular 50% de chance do PIX ter sido pago
          status = Math.random() < 0.5 ? 'approved' : 'pending';
          statusMessage = status === 'approved' ? 'Pagamento aprovado' : 'Aguardando pagamento';
        } else if (transactionId.startsWith('bol_')) {
          // Simular 30% de chance do boleto ter sido pago
          status = Math.random() < 0.3 ? 'approved' : 'pending';
          statusMessage = status === 'approved' ? 'Pagamento aprovado' : 'Aguardando pagamento';
        } else {
          status = 'not_found';
          statusMessage = 'Transação não encontrada';
        }
        
        resolve({
          success: true,
          message: statusMessage,
          data: {
            transactionId,
            status,
            updatedAt: new Date().toISOString()
          }
        });
      }, 1000);
    });
  }
};

export default PaymentService; 