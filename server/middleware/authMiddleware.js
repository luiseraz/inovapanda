const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

/**
 * Middleware para proteção de rotas - verifica se o usuário está autenticado
 */
exports.protect = async (req, res, next) => {
  let token;

  // Verificar se o token existe no header de autorização
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extrair o token do header
      token = req.headers.authorization.split(' ')[1];

      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar o usuário pelo ID sem incluir a senha
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return ApiResponse.unauthorized(res, 'Token inválido ou expirado');
    }
  }

  if (!token) {
    return ApiResponse.unauthorized(res, 'Acesso não autorizado, token não fornecido');
  }
};

/**
 * Middleware para verificar se o usuário tem permissão de administrador
 */
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return ApiResponse.forbidden(res, 'Acesso restrito a administradores');
  }
};

/**
 * Gera um token JWT para o usuário
 * @param {string} id - ID do usuário
 * @returns {string} - Token JWT
 */
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}; 