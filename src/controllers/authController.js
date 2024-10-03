const User = require('../models/User');

// Função de registro para criar novos usuários
const register = async (req, res) => {
  const { user_name, senha, isAdmin } = req.body;

  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ user_name });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criar um novo usuário
    const newUser = new User({
      user_name,
      senha,
      isAdmin: isAdmin || false, // Define como false por padrão se não for enviado
    });

    // Salvar o novo usuário no banco de dados
    await newUser.save();

    return res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função de login para autenticação
const login = async (req, res) => {
  const { user_name, senha } = req.body;

  try {
    // Busca o usuário pelo nome de usuário
    const user = await User.findOne({ user_name });

    // Se o usuário não existir, retornar erro
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha fornecida é igual à armazenada no banco de dados
    if (user.senha === senha) {
      return res.status(200).json({
        message: 'Acesso permitido',
        isAdmin: user.isAdmin
      });
    } else {
      return res.status(401).json({ message: 'Acesso negado. Senha incorreta.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  register,
  login,
};
