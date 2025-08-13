const Product = require('../models/Product');
const ApiResponse = require('../utils/apiResponse');
const { validationResult } = require('express-validator');

/**
 * @desc    Obter todos os produtos
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  try {
    // Configuração da paginação
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    // Filtros
    const filterOptions = {};

    // Filtrar por categoria
    if (req.query.category) {
      filterOptions.category = req.query.category;
    }

    // Filtrar por marca
    if (req.query.brand) {
      filterOptions.brand = req.query.brand;
    }

    // Filtrar por país de origem
    if (req.query.countryOfOrigin) {
      filterOptions.countryOfOrigin = req.query.countryOfOrigin;
    }

    // Filtrar por produtos em destaque
    if (req.query.featured === 'true') {
      filterOptions.featured = true;
    }

    // Filtrar por faixa de preço
    if (req.query.minPrice || req.query.maxPrice) {
      filterOptions.price = {};
      if (req.query.minPrice) {
        filterOptions.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filterOptions.price.$lte = Number(req.query.maxPrice);
      }
    }

    // Opções de ordenação
    let sortOptions = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price_asc':
          sortOptions.price = 1;
          break;
        case 'price_desc':
          sortOptions.price = -1;
          break;
        case 'newest':
          sortOptions.createdAt = -1;
          break;
        case 'rating':
          sortOptions['ratings.average'] = -1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1; // Padrão: mais recentes primeiro
    }

    // Busca por texto (nome ou descrição)
    if (req.query.search) {
      filterOptions.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Contar total de produtos (para paginação)
    const totalProducts = await Product.countDocuments(filterOptions);

    // Buscar produtos com paginação, filtros e ordenação
    const products = await Product.find(filterOptions)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    // Informações da paginação
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalItems: totalProducts,
      itemsPerPage: limit
    };

    return ApiResponse.success(res, 'Produtos recuperados com sucesso', {
      products,
      pagination
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return ApiResponse.error(res, 'Erro ao buscar produtos');
  }
};

/**
 * @desc    Obter um produto pelo ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return ApiResponse.success(res, 'Produto encontrado com sucesso', product);
    } else {
      return ApiResponse.notFound(res, 'Produto não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return ApiResponse.error(res, 'Erro ao buscar produto');
  }
};

/**
 * @desc    Criar um novo produto
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.validationError(res, 'Erros de validação', errors.array());
    }

    // Extrair dados do corpo da requisição
    const {
      name,
      description,
      price,
      originalPrice,
      discount,
      images,
      category,
      brand,
      countryOfOrigin,
      stock,
      featured,
      specifications
    } = req.body;

    // Criar novo produto
    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      discount,
      images,
      category,
      brand,
      countryOfOrigin,
      stock,
      featured,
      specifications
    });

    return ApiResponse.success(res, 'Produto criado com sucesso', product, 201);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return ApiResponse.error(res, 'Erro ao criar produto');
  }
};

/**
 * @desc    Atualizar um produto
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.validationError(res, 'Erros de validação', errors.array());
    }

    // Buscar produto a ser atualizado
    const product = await Product.findById(req.params.id);

    if (!product) {
      return ApiResponse.notFound(res, 'Produto não encontrado');
    }

    // Atualizar campos do produto
    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });

    // Salvar produto atualizado
    const updatedProduct = await product.save();

    return ApiResponse.success(res, 'Produto atualizado com sucesso', updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return ApiResponse.error(res, 'Erro ao atualizar produto');
  }
};

/**
 * @desc    Excluir um produto
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return ApiResponse.notFound(res, 'Produto não encontrado');
    }

    await product.deleteOne();
    return ApiResponse.success(res, 'Produto excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return ApiResponse.error(res, 'Erro ao excluir produto');
  }
};

/**
 * @desc    Adicionar uma avaliação a um produto
 * @route   POST /api/products/:id/reviews
 * @access  Private
 */
exports.createProductReview = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.validationError(res, 'Erros de validação', errors.array());
    }

    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return ApiResponse.notFound(res, 'Produto não encontrado');
    }

    // Verificar se o usuário já avaliou este produto
    const alreadyReviewed = product.ratings.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return ApiResponse.error(res, 'Você já avaliou este produto', 400);
    }

    // Criar nova avaliação
    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment
    };

    // Adicionar avaliação ao produto
    product.ratings.reviews.push(review);
    
    // Atualizar contagem de avaliações
    product.ratings.count = product.ratings.reviews.length;
    
    // Calcular média das avaliações
    product.ratings.average = product.ratings.reviews.reduce((acc, item) => item.rating + acc, 0) / 
                             product.ratings.reviews.length;

    await product.save();

    return ApiResponse.success(res, 'Avaliação adicionada com sucesso', product.ratings);
  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error);
    return ApiResponse.error(res, 'Erro ao adicionar avaliação');
  }
}; 