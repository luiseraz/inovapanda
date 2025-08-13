const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, informe seu nome'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor, informe seu email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, informe um email válido']
  },
  password: {
    type: String,
    required: [true, 'Por favor, informe uma senha'],
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
    select: false // Não incluir a senha nas consultas por padrão
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Criptografar senha antes de salvar
userSchema.pre('save', async function(next) {
  // Só executa se a senha foi modificada
  if (!this.isModified('password')) {
    return next();
  }
  
  // Gerar salt e criptografar senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para verificar senha
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);