//const userDomain = require('../domain/User/userDomain.js');
//const billDomain = require('../domain/Bill/billDomain.js');
const express = require('express');
const app = express();

const userRouter = require('./userControllers');
const billRouter = require('./billControllers');
const notificationRouter = require('./notificationControllers')

function start() {
    //app.use(express.static('public'));
    app.use('/', userRouter);
    app.use('/cadastrarUsuario', userRouter);
    
    app.use('/', billRouter);
    app.use('/conta/cadastrarConta', billRouter);
    app.use('/conta/pagarConta', billRouter);
    app.use('/conta/listarContas', billRouter);

    app.use('/', notificationRouter);

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Servidor rodando na porta '+PORT)
    });
}

exports.start = start;
