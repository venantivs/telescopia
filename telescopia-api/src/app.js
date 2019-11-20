const express = require('express');
const app = express();

//Rotas
const index = require('./routes/index');
const articleRoute = require('./routes/articleRoute');

app.use('/', index);
app.use('/articles', articleRoute);

app.use(function(req, res){
    res.status(400).send({
        status: 'failure',
        message: 'URL inválida.'
    });
});

module.exports = app;
