// Configuração das rotas que pertencem à entidade Usuario.
const express = require('express');
const router = express.Router();
const userDomain = require('../domain/User/userDomain.js');

router.get('/', (req, res) => {
    res.send("Página principal do painel usuario")
});

router.post('/cadastrarUsuario', (req, res) => {
    const { login, password } = req.body;
    userDomain.registerUser(login, password)
        .then(result => {
            res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.' });
        });
});

router.post('/login', (req, res) => {
    const { login, password } = req.body;

    userDomain.authenticateUser(login, password)
        .then(user => {
            if (user) {
                res.status(200).json({ message: 'Login bem-sucedido' });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        })
        .catch(error => {
            console.error('Erro ao autenticar usuário:', error);
            res.status(500).json({ message: 'Erro ao autenticar usuário' });
        });
});

module.exports = router;