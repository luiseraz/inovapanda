const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');
const { generateToken } = require('../middleware/authMiddleware');
const { validationResult } = require('express-validator');

/**
 * @desc    Registrar um novo usuário
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.registerUser = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.validationError(res, 'Erros de validação', errors.array());
    }

    const { name, email, password } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(res, 'Usuário já cadastrado com este email', 400);
    }

    // Criar novo usuário
    try {
      const user = await User.create({
        name,
        email,
        password
      });

      if (user) {
        // Gerar token JWT
        const token = generateToken(user._id);

        // Retornar dados do usuário e token
        return ApiResponse.success(
          res,
          'Usuário registrado com sucesso',
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
          },
          201
        );
      } else {
        return ApiResponse.error(res, 'Dados de usuário inválidos');
      }
    } catch (createError) {
      console.error('Erro específico ao criar usuário:', createError);
      return ApiResponse.error(res, `Erro ao criar usuário: ${createError.message}`, 500);
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return ApiResponse.error(res, `Erro ao registrar usuário: ${error.message}`, 500);
  }
};

/**
 * @desc    Autenticar usuário e gerar token
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.loginUser = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.validationError(res, 'Erros de validação', errors.array());
    }

    const { email, password } = req.body;

    // Buscar usuário pelo email e incluir a senha na consulta
    const user = await User.findOne({ email }).select('+password');
    
    // Verificar se o usuário existe e a senha está correta
    if (user && (await user.matchPassword(password))) {
      // Gerar token JWT
      const token = generateToken(user._id);

      // Retornar dados do usuário e token
      return ApiResponse.success(res, 'Login realizado com sucesso', {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      return ApiResponse.unauthorized(res, 'Email ou senha inválidos');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return ApiResponse.error(res, 'Erro ao fazer login');
  }
};

/**
 * @desc    Obter perfil do usuário
 * @route   GET /api/auth/profile
 * @access  Private
 */
exports.getUserProfile = async (req, res) => {
  try {
    // O usuário já está disponível em req.user pelo middleware de autenticação
    const user = await User.findById(req.user._id);

    if (user) {
      return ApiResponse.success(res, 'Perfil do usuário recuperado com sucesso', {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone
      });
    } else {
      return ApiResponse.notFound(res, 'Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    return ApiResponse.error(res, 'Erro ao obter perfil do usuário');
  }
};

/**
 * @desc    Atualizar perfil do usuário
 * @route   PUT /api/auth/profile
 * @access  Private
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Atualizar campos do usuário
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      // Atualizar senha se fornecida
      if (req.body.password) {
        user.password = req.body.password;
      }

      // Atualizar endereço se fornecido
      if (req.body.address) {
        user.address = {
          ...user.address,
          ...req.body.address
        };
      }

      // Atualizar telefone se fornecido
      if (req.body.phone) {
        user.phone = req.body.phone;
      }

      // Salvar usuário atualizado
      const updatedUser = await user.save();

      // Gerar novo token
      const token = generateToken(updatedUser._id);

      return ApiResponse.success(res, 'Perfil atualizado com sucesso', {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        address: updatedUser.address,
        phone: updatedUser.phone,
        token
      });
    } else {
      return ApiResponse.notFound(res, 'Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    return ApiResponse.error(res, 'Erro ao atualizar perfil do usuário');
  }
}; 