// Configuração das rotas que pertencem à entidade Conta.
const express = require('express');
const router = express.Router();
const billDomain = require('../domain/Bill/billDomain.js');

router.get('/', (req, res) => {
    res.send("Página principal do painel conta")
});

router.post('/cadastrarConta', (req, res) => {
    const { name, value, type, divide, repeat, num_parts, first_payment, payday } = req.body;
    // resolver userID
    billDomain.registerBill(userID, name, value, type, divide, repeat, num_parts, first_payment, payday)
        .then(result => {
            res.status(200).json({ message: 'Conta cadastrado com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao cadastrar conta:', error);
            res.status(500).json({ message: 'Erro ao cadastrar conta. Por favor, tente novamente mais tarde.' });
        });
});

module.exports = router;