const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const Produto = require('../models/Produto');

router.get('/buscar', produtoController.buscarProdutoPorNome);
// Rotas para CRUD de produtos
router.get('/', produtoController.getAllProdutos);  // Listar todos
router.get('/:id', produtoController.getProdutoById);  // Listar por ID
router.post('/', produtoController.createProduto);  // Criar
router.put('/:id', produtoController.updateProduto);  // Editar
router.delete('/:id', produtoController.deleteProduto);  // Deletar


router.post('/bulk', async (req, res) => {
  try {
    const produtos = await Produto.insertMany(req.body);
    res.status(201).json(produtos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

router.get('/buscar', async (req, res) => {
    const { nome } = req.query;
    try {
      const produtos = await Produto.find({ nome: { $regex: nome, $options: 'i' } });
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  });

});

module.exports = router;
