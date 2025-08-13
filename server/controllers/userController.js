const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');
const { generateToken } = require('../middleware/authMiddleware');

/**
 * @desc    Obter todos os usuários
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res) => {
  try {
    // Configuração da paginação
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    // Contar total de usuários
    const totalUsers = await User.countDocuments();

    // Buscar usuários com paginação
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Informações da paginação
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalItems: totalUsers,
      itemsPerPage: limit
    };

    return ApiResponse.success(res, 'Usuários recuperados com sucesso', {
      users,
      pagination
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return ApiResponse.error(res, 'Erro ao buscar usuários');
  }
};

/**
 * @desc    Obter um usuário pelo ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      return ApiResponse.success(res, 'Usuário encontrado com sucesso', user);
    } else {
      return ApiResponse.notFound(res, 'Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return ApiResponse.error(res, 'Erro ao buscar usuário');
  }
};

/**
 * @desc    Atualizar um usuário
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return ApiResponse.notFound(res, 'Usuário não encontrado');
    }

    // Atualizar campos do usuário
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    // Se uma nova senha for fornecida, atualizá-la
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

    const updatedUser = await user.save();

    return ApiResponse.success(res, 'Usuário atualizado com sucesso', {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
      phone: updatedUser.phone
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return ApiResponse.error(res, 'Erro ao atualizar usuário');
  }
};

/**
 * @desc    Excluir um usuário
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return ApiResponse.notFound(res, 'Usuário não encontrado');
    }

    // Não permitir que um administrador exclua a si mesmo
    if (user._id.toString() === req.user._id.toString()) {
      return ApiResponse.error(res, 'Não é possível excluir sua própria conta', 400);
    }

    await user.deleteOne();
    return ApiResponse.success(res, 'Usuário excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return ApiResponse.error(res, 'Erro ao excluir usuário');
  }
}; 