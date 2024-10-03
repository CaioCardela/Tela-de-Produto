const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const produtoRoutes = require('./src/routes/produtoRoutes');
const authRoutes = require('./src/routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB Atlas
const mongoUri = 'mongodb+srv://isaquecascaes:12345@cluster0.bmbh4.mongodb.net/produtosDB?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((err) => console.error(err));

// Usar rotas de produto
app.use('/api/produtos', produtoRoutes);
app.use('/api/auth', authRoutes); 

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
