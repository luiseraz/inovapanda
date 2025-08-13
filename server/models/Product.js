const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, forneça o nome do produto'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Por favor, forneça a descrição do produto']
  },
  price: {
    type: Number,
    required: [true, 'Por favor, forneça o preço do produto'],
    min: [0, 'O preço não pode ser negativo']
  },
  originalPrice: {
    type: Number,
    min: [0, 'O preço original não pode ser negativo']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'O desconto não pode ser negativo'],
    max: [100, 'O desconto não pode ser maior que 100%']
  },
  images: [
    {
      url: String,
      alt: String
    }
  ],
  category: {
    type: String,
    required: [true, 'Por favor, selecione a categoria do produto'],
    enum: [
      'Smartphones',
      'Notebooks',
      'Tablets',
      'Smartwatches',
      'Acessórios',
      'Gadgets',
      'Audio',
      'Câmeras',
      'Outros'
    ]
  },
  brand: {
    type: String,
    required: [true, 'Por favor, forneça a marca do produto']
  },
  countryOfOrigin: {
    type: String,
    required: [true, 'Por favor, forneça o país de origem']
  },
  stock: {
    type: Number,
    required: [true, 'Por favor, forneça a quantidade em estoque'],
    min: [0, 'O estoque não pode ser negativo'],
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  specifications: [
    {
      name: String,
      value: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Método virtual para obter o preço com desconto
productSchema.virtual('discountedPrice').get(function() {
  if (this.discount && this.discount > 0) {
    return this.price * (1 - this.discount / 100);
  }
  return this.price;
});

// Garantir que os virtuais sejam incluídos
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema); 