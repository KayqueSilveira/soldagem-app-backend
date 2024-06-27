const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password, name} = req.body;

    // Verifica se o usuário já existe
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username já existe' });
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria novo usuário
    const newUser = new User(username, hashedPassword, name);
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Rota de autenticação
router.post('/authenticate', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
    }

    // Gera token JWT
    const token = jwt.sign({ username: user.username }, 'seu_token_secreto', { expiresIn: '1h' });

    // Retorna o token JWT
    res.status(200).json({ name: user.name });
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Outras rotas CRUD conforme necessário (GET, PUT, DELETE)

module.exports = router;
