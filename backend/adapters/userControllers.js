// Configuração das rotas que pertencem à entidade Usuario.
const express = require('express');
const router = express.Router();
const userDomain = require('../domain/User/userDomain.js');

router.get('/', (req, res) => {
    res.send("Página principal do painel usuario")
});

router.get('/cadastrarUsuario', (req, res) => {
    result = userDomain.registerUser("teste1", "senha")
});

module.exports = router;