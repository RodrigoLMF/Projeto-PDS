const express = require('express');
const app = express();

function start() {
    app.get('/', (req, res) => {
        //res.render('index.html');
        res.send('Página inicial')
    });

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Servidor rodando na porta '+PORT)
    });
}

exports.start = start;
