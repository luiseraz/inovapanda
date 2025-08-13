const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Todas as rotas de usuários requerem autenticação de administrador
router.use(protect, admin);

// Rota para obter todos os usuários
router.get('/', getUsers);

// Rotas para operações com um usuário específico
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router; 