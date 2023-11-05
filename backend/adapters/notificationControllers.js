// Configuração das rotas que pertencem à entidade Notificação.
const express = require('express');
const router = express.Router();
const notificationDomain = require('../domain/Notification/notificationDomain.js');

router.get('/', (req, res) => {
    res.send("Página principal do painel notificação")
});

router.post('/notificacao/getNotificacoes', (req, res) => {
    const { userId } = req.body;
    
    notificationDomain.getUserNotifications(userId)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Erro ao buscar notificações:', error);
            res.status(500).json({ message: 'Erro ao buscar notificações. Por favor, tente novamente mais tarde.' });
        });
});

module.exports = router;