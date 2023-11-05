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

router.post('/conta/listarContas', (req, res) => {
    const { userID } = req.body;

    billDomain.getAllBillsByUserId(userID)
        .then(bills => {
            res.status(200).json({ bills });
        })
        .catch(error => {
            console.error('Erro ao listar contas:', error);
            res.status(500).json({ message: 'Erro ao listar contas. Por favor, tente novamente mais tarde.' });
        });
});

router.post('/conta/somatorioContasPositivasAll', (req, res) => {
    const { userID } = req.body;
  
    billDomain.getPositiveBalanceAll(userID)
      .then((sum) => {
        res.status(200).json({ sum });
      })
      .catch((error) => {
        console.error('Erro ao calcular o somatório das contas positivas:', error);
        res.status(500).json({ message: 'Erro ao calcular o somatório das contas positivas. Por favor, tente novamente mais tarde.' });
      });
  });

module.exports = router;