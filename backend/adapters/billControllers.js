// Configuração das rotas que pertencem à entidade Conta.
const express = require('express');
const router = express.Router();
const billDomain = require('../domain/Bill/billDomain.js');

router.get('/', (req, res) => {
    res.send("Página principal do painel conta")
});

router.post('/conta/cadastrarConta', (req, res) => {
    const { userId, billName, value, type, divide, repeat, numParts, firstPayment, payday } = req.body;

    billDomain.registerBill(userId, billName, value, type, divide, repeat, numParts, firstPayment, payday)
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
    const { userId } = req.body;

    billDomain.getAllBillsByUserId(userId)
        .then(bills => {
            res.status(200).json({ bills });
        })
        .catch(error => {
            console.error('Erro ao listar contas:', error);
            res.status(500).json({ message: 'Erro ao listar contas. Por favor, tente novamente mais tarde.' });
        });
});

router.post('/conta/listarContasEmIntervalo', (req, res) => {
    const { userId, startDate, endDate } = req.body;

    billDomain.getBillsWithinPeriod(userId, startDate, endDate)
        .then(bills => {
            //res.status(200).json({ bills });
            res.send(bills);
        })
        .catch(error => {
            console.error('Erro ao listar contas:', error);
            res.status(500).json({ message: 'Erro ao listar contas. Por favor, tente novamente mais tarde.' });
        });
});

router.post('/conta/somatorioContasParciaisAll', (req, res) => {
    const { userId, type } = req.body;

    billDomain.getPositiveBalanceAll(userId, type)
        .then((sum) => {
            res.status(200).json({ sum });
        })
        .catch((error) => {
            console.error('Erro ao calcular o somatório das contas parciais:', error);
            res.status(500).json({ message: 'Erro ao calcular o somatório das contas parciais. Por favor, tente novamente mais tarde.' });
        });
});

router.post('/conta/somatorioContasTotaisAll', (req, res) => {
    const { userId } = req.body;

    billDomain.getTotalBalanceAll(userId)
        .then((sum) => {
            res.status(200).json({ sum });
        })
        .catch((error) => {
            console.error('Erro ao calcular o somatório das contas :', error);
            res.status(500).json({ message: 'Erro ao calcular o somatório das contas . Por favor, tente novamente mais tarde.' });
        });
});

router.post('/conta/somatorioContasTotaisEmIntervalo', (req, res) => {
    const { userId, startDate, endDate } = req.body;

    billDomain.getTotalBalanceWithinPeriod(userId, startDate, endDate)
        .then((sum) => {
            res.status(200).json({ sum });
        })
        .catch((error) => {
            console.error('Erro ao calcular o somatório das contas :', error);
            res.status(500).json({ message: 'Erro ao calcular o somatório das contas . Por favor, tente novamente mais tarde.' });
        });
});

module.exports = router;