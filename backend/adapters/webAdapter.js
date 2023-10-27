const userDomain = require('../domain/User/userDomain.js');
const billDomain = require('../domain/Bill/billDomain.js');
const express = require('express');
const app = express();

function start() {
    app.use(express.static('public'));
    
    app.get('/', (req, res) => {
        res.send('Página inicial')
    });

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Servidor rodando na porta '+PORT)
    });
}

exports.start = start;
