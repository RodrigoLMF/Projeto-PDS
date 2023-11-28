const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cors = require('cors')

const path = require('path');

const userRouter = require('./userControllers');
const billRouter = require('./billControllers');
const notificationRouter = require('./notificationControllers')

function start() {
    app.get('/css/stylesheet.css', (req, res) => {
        res.sendFile(path.join(__dirname, '../../css/stylesheet.css'));
    });

    app.get('/js/login.js', (req, res) => {
        res.sendFile(path.join(__dirname, '../../js/login.js'));
    });

    app.get('/js/signup.js', (req, res) => {
        res.sendFile(path.join(__dirname, '../../js/signup.js'));
    });

    app.get('/css/bootstrap.min.css', (req, res) => {
        res.sendFile(path.join(__dirname, '../../css/bootstrap.min.css'));
    });

    app.get('/css/style.css', (req, res) => {
        res.sendFile(path.join(__dirname, '../../css/style.css'));
    });

    app.get('/css/typography.css', (req, res) => {
        res.sendFile(path.join(__dirname, '../../css/typography.css'));
    });

    app.use(express.static(path.join(__dirname + '../../')));

    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(cors());

    app.use('/', userRouter);
    app.use('/cadastro', userRouter);
    app.use('/cadastrarUsuario', userRouter);
    app.use('/login', userRouter);
    app.use('/homepage', userRouter);

    app.use('/', billRouter);
    app.use('/conta/cadastrarConta', billRouter);
    app.use('/conta/pagarConta', billRouter);
    app.use('/conta/listarContas', billRouter);
    app.use('/conta/somatorioContasParciaisAll', billRouter);
    app.use('/conta/somatorioContasTotaisAll', billRouter);
    app.use('/conta/listarContasEmIntervalo', billRouter);
    app.use('/conta/somatorioContasParciaisEmIntervalo', billRouter);
    app.use('/conta/somatorioContasTotaisEmIntervalo', billRouter);

    app.use('/', notificationRouter);
    app.use('/notificacao/getNotificacoes', notificationRouter);

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Servidor rodando na porta ' + PORT)
    });
}

exports.start = start;