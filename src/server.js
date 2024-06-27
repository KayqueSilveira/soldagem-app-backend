const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const app = express();
const port = 3000;

// Lista de origens permitidas
// Permitir qualquer origem
const allowedOrigins = ['*'];

// Configurar CORS para permitir solicitações de qualquer origem
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true); // Permitir todas as origens
  },
  optionsSuccessStatus: 200
};

// Middleware para processar JSON e configurar CORS
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Middleware de registro de logs HTTP
app.use(morgan('combined'));

// Rotas
app.use('/users', userRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
