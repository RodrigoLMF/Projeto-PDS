//const userDomain = require('../domain/User/userDomain.js');
//const billDomain = require('../domain/Bill/billDomain.js');
const express = require('express');
const app = express();

const userRouter = require('./userControllers');
const billRouter = require('./billControllers');

function start() {
    //app.use(express.static('public'));
    app.use('/', userRouter);

    app.use('/cadastrarUsuario', userRouter);
    app.use('/', billRouter);
    app.use('/cadastrarConta', billRouter);

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Servidor rodando na porta '+PORT)
    });
}

exports.start = start;
