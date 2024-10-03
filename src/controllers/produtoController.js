const Produto = require('../models/Produto');

// Listar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Listar um produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Criar um novo produto
exports.createProduto = async (req, res) => {
  const { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial } = req.body;
  const novoProduto = new Produto({ nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial });

  try {
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Atualizar um produto existente
exports.updateProduto = async (req, res) => {
  const { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial } = req.body;

  try {
    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial },
      { new: true }
    );
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(produto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Deletar um produto
exports.deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.buscarProdutoPorNome = async (req, res) => {
  try {
    const { nome } = req.query; // Captura o parâmetro de consulta "nome"
    if (!nome) {
      return res.status(400).json({ error: "Parâmetro 'nome' é obrigatório" });
    }

    // Utiliza expressão regular para realizar busca case-insensitive
    const produtos = await Produto.find({ nome: new RegExp(nome, 'i') });

    if (produtos.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado com esse nome" });
    }

    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
};
