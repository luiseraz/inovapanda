const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');
const { validationResult } = require('express-validator');

/**
 * @desc    Criar um novo pedido
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.validationError(res, 'Erros de validação', errors.array());
    }

    const {
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    } = req.body;

    // Verificar se há itens no pedido
    if (items && items.length === 0) {
      return ApiResponse.error(res, 'Não há itens no pedido', 400);
    }

    // Criar o pedido
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    });

    // Atualizar o estoque dos produtos
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    // Adicionar o pedido à lista de pedidos do usuário
    const user = await User.findById(req.user._id);
    if (user) {
      user.orders.push(order._id);
      await user.save();
    }

    return ApiResponse.success(res, 'Pedido criado com sucesso', order, 201);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return ApiResponse.error(res, 'Erro ao criar pedido');
  }
};

/**
 * @desc    Obter todos os pedidos do usuário logado
 * @route   GET /api/orders
 * @access  Private
 */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return ApiResponse.success(res, 'Pedidos recuperados com sucesso', orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return ApiResponse.error(res, 'Erro ao buscar pedidos');
  }
};

/**
 * @desc    Obter um pedido pelo ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    // Verificar se o pedido existe
    if (!order) {
      return ApiResponse.notFound(res, 'Pedido não encontrado');
    }

    // Verificar se o pedido pertence ao usuário logado ou é admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return ApiResponse.forbidden(res, 'Não autorizado a acessar este pedido');
    }

    return ApiResponse.success(res, 'Pedido encontrado com sucesso', order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return ApiResponse.error(res, 'Erro ao buscar pedido');
  }
};

/**
 * @desc    Atualizar pedido para pago
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return ApiResponse.notFound(res, 'Pedido não encontrado');
    }

    // Verificar se o pedido pertence ao usuário logado ou é admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return ApiResponse.forbidden(res, 'Não autorizado a atualizar este pedido');
    }

    // Atualizar status de pagamento
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'processing';
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };

    const updatedOrder = await order.save();
    return ApiResponse.success(res, 'Pedido atualizado como pago', updatedOrder);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return ApiResponse.error(res, 'Erro ao atualizar pedido');
  }
};

/**
 * @desc    Atualizar pedido para entregue
 * @route   PUT /api/orders/:id/deliver
 * @access  Private/Admin
 */
exports.updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return ApiResponse.notFound(res, 'Pedido não encontrado');
    }

    // Atualizar status de entrega
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 'delivered';
    
    // Atualizar número de rastreio se fornecido
    if (req.body.trackingNumber) {
      order.trackingNumber = req.body.trackingNumber;
    }

    const updatedOrder = await order.save();
    return ApiResponse.success(res, 'Pedido atualizado como entregue', updatedOrder);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return ApiResponse.error(res, 'Erro ao atualizar pedido');
  }
};

/**
 * @desc    Atualizar status do pedido
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return ApiResponse.error(res, 'Status é obrigatório', 400);
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return ApiResponse.notFound(res, 'Pedido não encontrado');
    }

    // Atualizar status do pedido
    order.status = status;

    // Se o status for "shipped", adicionar número de rastreio se fornecido
    if (status === 'shipped' && req.body.trackingNumber) {
      order.trackingNumber = req.body.trackingNumber;
    }

    const updatedOrder = await order.save();
    return ApiResponse.success(res, `Status do pedido atualizado para ${status}`, updatedOrder);
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    return ApiResponse.error(res, 'Erro ao atualizar status do pedido');
  }
};

/**
 * @desc    Obter todos os pedidos (apenas admin)
 * @route   GET /api/orders/admin
 * @access  Private/Admin
 */
exports.getOrders = async (req, res) => {
  try {
    // Configuração da paginação
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    // Filtros
    const filterOptions = {};
    
    // Filtrar por status
    if (req.query.status) {
      filterOptions.status = req.query.status;
    }
    
    // Filtrar por pagamento
    if (req.query.isPaid === 'true') {
      filterOptions.isPaid = true;
    } else if (req.query.isPaid === 'false') {
      filterOptions.isPaid = false;
    }
    
    // Filtrar por entrega
    if (req.query.isDelivered === 'true') {
      filterOptions.isDelivered = true;
    } else if (req.query.isDelivered === 'false') {
      filterOptions.isDelivered = false;
    }

    // Contar total de pedidos
    const totalOrders = await Order.countDocuments(filterOptions);

    // Buscar pedidos com paginação
    const orders = await Order.find(filterOptions)
      .populate('user', 'id name email')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Informações da paginação
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalItems: totalOrders,
      itemsPerPage: limit
    };

    return ApiResponse.success(res, 'Pedidos recuperados com sucesso', { orders, pagination });
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return ApiResponse.error(res, 'Erro ao buscar pedidos');
  }
}; 