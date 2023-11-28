// Configuração das rotas que pertencem à entidade Usuario.
const express = require('express');
const router = express.Router();
const path = require('path');
const userDomain = require('../domain/User/userDomain.js');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../html/cadastro.html'));
});

router.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, '../../html/homepage.html'));
});

router.post('/cadastrarUsuario', (req, res) => {
    
    login = req.body.login
    password = req.body.password
    console.log(login, password)
    userDomain.registerUser(login, password)
        .then(result => {
            console.log('Usuário cadastrado com sucesso');
            res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.' });
        });
});

router.post('/login', (req, res) => {
    
    login = req.body.login
    password = req.body.password
    
    userDomain.authenticateUser(login, password)
        .then(user => {
            if (user) {
                console.log("Login bem sucedido")
                //res.sendFile(path.join(__dirname, '../../html/homepage.html'));
                //res.status(200).send({ message: 'Login bem-sucedido' })
                res.status(200).json({ message: 'Login bem-sucedido' });
            } else {
                console.log('Credenciais inválidas') 
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        })
        .catch(error => {
            console.error('Erro ao autenticar usuário:', error);
            res.status(500).json({ message: 'Erro ao autenticar usuário' });
        });
});

module.exports = router;