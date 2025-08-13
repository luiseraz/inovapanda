const express = require('express');
const { check } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validação para registro de usuário
const registerValidation = [
  check('name', 'O nome é obrigatório').not().isEmpty(),
  check('email', 'Por favor, inclua um email válido').isEmail(),
  check('password', 'A senha deve ter pelo menos 6 caracteres').isLength({ min: 6 })
];

// Validação para login
const loginValidation = [
  check('email', 'Por favor, inclua um email válido').isEmail(),
  check('password', 'A senha é obrigatória').exists()
];

// Rota para registro de usuário
router.post('/register', registerValidation, registerUser);

// Rota para login
router.post('/login', loginValidation, loginUser);

// Rota para obter perfil do usuário (protegida)
router.get('/profile', protect, getUserProfile);

// Rota para atualizar perfil do usuário (protegida)
router.put('/profile', protect, updateUserProfile);

module.exports = router; 