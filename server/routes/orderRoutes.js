const express = require('express');
const { check } = require('express-validator');
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validação para criação de pedido
const orderValidation = [
  check('items', 'Itens do pedido são obrigatórios').isArray({ min: 1 }),
  check('items.*.product', 'ID do produto é obrigatório').not().isEmpty(),
  check('items.*.quantity', 'Quantidade deve ser pelo menos 1').isInt({ min: 1 }),
  check('shippingAddress.street', 'Endereço é obrigatório').not().isEmpty(),
  check('shippingAddress.city', 'Cidade é obrigatória').not().isEmpty(),
  check('shippingAddress.state', 'Estado é obrigatório').not().isEmpty(),
  check('shippingAddress.zipCode', 'CEP é obrigatório').not().isEmpty(),
  check('shippingAddress.country', 'País é obrigatório').not().isEmpty(),
  check('paymentMethod', 'Método de pagamento é obrigatório').not().isEmpty(),
  check('itemsPrice', 'Preço dos itens é obrigatório').isFloat({ min: 0 }),
  check('shippingPrice', 'Preço do frete é obrigatório').isFloat({ min: 0 }),
  check('taxPrice', 'Valor de impostos é obrigatório').isFloat({ min: 0 }),
  check('totalPrice', 'Preço total é obrigatório').isFloat({ min: 0 })
];

// Rotas protegidas - requer autenticação
router.post('/', protect, orderValidation, createOrder);
router.get('/', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

// Rotas protegidas - requer permissão de administrador
router.get('/admin/all', protect, admin, getOrders);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router; 