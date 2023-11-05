// Configuração das rotas que pertencem à entidade Conta.
const express = require('express');
const router = express.Router();
const billDomain = require('../domain/Bill/billDomain.js');

// resolver userID
let userID = 1;

router.get('/', (req, res) => {
    res.send("Página principal do painel conta")
});

router.post('/conta/cadastrarConta', (req, res) => {
    const { billName, value, type, divide, repeat, numParts, firstPayment, payday } = req.body;

    billDomain.registerBill(userID, billName, value, type, divide, repeat, numParts, firstPayment, payday)
        .then(result => {
            res.status(200).json({ message: 'Conta cadastrado com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao cadastrar conta:', error);
            res.status(500).json({ message: 'Erro ao cadastrar conta. Por favor, tente novamente mais tarde.' });
        });
});

router.post('/conta/quitarConta', (req, res) => {
    const { billId } = req.body;

    billDomain.payBill(billId)
        .then(result => {
            res.status(200).json({ message: 'Conta quitada com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao quitar conta:', error);
            res.status(500).json({ message: 'Erro ao quitar conta. Por favor, tente novamente mais tarde.' });
        });
});

module.exports = router;