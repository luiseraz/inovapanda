const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        required: true,
        min: [1, 'A quantidade deve ser pelo menos 1']
      },
      image: String
    }
  ],
  shippingAddress: {
    street: {
      type: String,
      required: [true, 'O endereço de entrega é obrigatório']
    },
    city: {
      type: String,
      required: [true, 'A cidade é obrigatória']
    },
    state: {
      type: String,
      required: [true, 'O estado é obrigatório']
    },
    zipCode: {
      type: String,
      required: [true, 'O CEP é obrigatório']
    },
    country: {
      type: String,
      required: [true, 'O país é obrigatório']
    }
  },
  paymentMethod: {
    type: String,
    required: [true, 'O método de pagamento é obrigatório'],
    enum: ['credit_card', 'debit_card', 'pix', 'boleto']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    default: 'pending'
  },
  trackingNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema); 