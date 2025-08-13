const express = require('express');
const { check } = require('express-validator');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validação para criação/atualização de produto
const productValidation = [
  check('name', 'O nome do produto é obrigatório').not().isEmpty(),
  check('description', 'A descrição do produto é obrigatória').not().isEmpty(),
  check('price', 'O preço deve ser um número maior que zero').isFloat({ min: 0.01 }),
  check('category', 'A categoria do produto é obrigatória').not().isEmpty(),
  check('brand', 'A marca do produto é obrigatória').not().isEmpty(),
  check('countryOfOrigin', 'O país de origem é obrigatório').not().isEmpty(),
  check('stock', 'O estoque deve ser um número inteiro não negativo').isInt({ min: 0 })
];

// Validação para avaliações
const reviewValidation = [
  check('rating', 'A avaliação deve ser um número entre 1 e 5').isFloat({ min: 1, max: 5 })
];

// Rotas públicas
router.get('/', getProducts);
router.get('/:id', getProductById);

// Rotas protegidas - requer autenticação
router.post('/:id/reviews', protect, reviewValidation, createProductReview);

// Rotas protegidas - requer permissão de administrador
router.post('/', protect, admin, productValidation, createProduct);
router.put('/:id', protect, admin, productValidation, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router; 