const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    open: {
        type: mongoose.Decimal128,
        required: true
    },
    close: {
        type: mongoose.Decimal128,
        required: true
    },
    variation: {
        type: mongoose.Decimal128,
        required: true
    },
    max: {
        type: mongoose.Decimal128,
        required: true
    },
    min: {
        type: mongoose.Decimal128,
        required: true
    }
})

const stockHistorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    historic: [historySchema]
})

const stockHistoryModel = mongoose.model('StocksHistories', stockHistorySchema)

exports.newStockHistory = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase()
    let stockName = req.body.name.toUpperCase()
    stockHistoryModel.findOne({ name: stockName }, (err, stockHistory) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else {
            if (stockHistory) {
                stockHistoryModel.findOneAndUpdate({ name: stockName }, { "$push": { "historic": { "$each": req.body.historic } } }, (err) => {
                    if (err) {
                        res.status(200).send({ status: 'failure', message: 'Não foi possível atualizar o histórico da ação.' })
                        console.log(err)
                    } else
                        res.status(200).send({ status: 'success', message: 'Histórico de ação atualizado com sucesso.' })
                })
            } else {
                stockHistoryModel.create(req.body, (err, stocksHistory) => {
                    if (err) {
                        res.status(200).send({ status: 'failure', message: 'Não foi possível inserir o histórico da ação.' })
                        console.log(err)
                    }
                    else
                        res.status(200).send({ status: 'success', message: 'Histórico de ação inserido com sucesso.' })
                })
            }
        }
    })
    
}

exports.getAllStocksHistory = (req, res, next) => {
    stockHistoryModel.find({}, (err, stocksHistory) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: stocksHistory })
    })
}