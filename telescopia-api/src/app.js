const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(cors())

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/telescopia-db', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Conexão com o MongoDB feita com sucesso.')
        })
        .catch((error) => {
            console.log('Houve um erro ao se conectar ao MongoDB: ' + error)
        })

//Rotas
const index = require('./routes/index')
const articleRoute = require('./routes/articleRoute')
const stockRoute = require('./routes/stockRoute')
const stockHistoryRoute = require('./routes/stockHistoryRoute')

app.use('/', index)
app.use('/articles', articleRoute)
app.use('/stocks', stockRoute)
app.use('/stocks/history', stockHistoryRoute)

app.use(function(req, res){
    res.status(400).send({
        status: 'failure',
        message: 'URL inválida.'
    })
})

module.exports = app