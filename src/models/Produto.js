const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  empresa: { type: String, required: false },
  categoria: { type: String, required: false }, // Adicionando categoria ao schema
  nivel: { type: String, required: false },
  urlImagem: { type: String, required: false },
  ingredientes: { type: String, required: false },
  razaoPrejudicial: { type: String, required: false },
});

module.exports = mongoose.model('Produto', produtoSchema);
