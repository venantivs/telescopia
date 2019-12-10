const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    },
    variation: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    min: {
        type: Number,
        required: false,
        default: -1.0
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

exports.getStocksNames = (req, res, next) => {
    stockHistoryModel.find({}, 'name -_id', (err, stocksNames) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: stocksNames })
    })
}

exports.getStockDatesByVariationAndName = (req, res, next) => {
    let name = req.params.name.toUpperCase()
    let variation = Number(req.params.variation)

    if (isNaN(variation)) {
        res.status(200).send({ status: 'failure', message: 'Variação inválida.' })
        return
    }

    stockHistoryModel.findOne({ 'name': name }, 'historic.date historic.variation historic.close -_id', (err, stockHistories) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else {
            if (stockHistories) {
                if (stockHistories.historic.length > 0) {
                    let stocksHistoriesByVariation = stockHistories.historic.filter((stockHistory) => {
                        return stockHistory.variation === variation
                    })
                    res.status(200).send({ status: 'success', message: stocksHistoriesByVariation })
                } else
                    res.status(200).send({ status: 'success', message: [] })
            } else
                res.status(200).send({ status: 'failure', message: "Esta ação/bolsa não está registrada." })
        }
    })
}

exports.getStockDatesByNameAndVariationGreaterThan = (req, res, next) => {
    let name = req.params.name.toUpperCase()
    let variation = Number(req.params.variation)

    if (isNaN(variation)) {
        res.status(200).send({ status: 'failure', message: 'Variação inválida.' })
        return
    }

    stockHistoryModel.findOne({ 'name': name }, 'historic.date historic.variation historic.close -_id' , (err, stockHistories) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else {
            if (stockHistories) {
                if (stockHistories.historic.length > 0) {
                    let stocksHistoriesByVariation = stockHistories.historic.filter((stockHistory) => {
                        return stockHistory.variation >= variation
                    })
                    res.status(200).send({ status: 'success', message: stocksHistoriesByVariation })
                } else
                    res.status(200).send({ status: 'success', message: [] })
            } else
                res.status(200).send({ status: 'failure', message: "Esta ação/bolsa não está registrada." })
        }
    })
}

exports.getStockDatesByNameAndVariationLessThan = (req, res, next) => {
    let name = req.params.name.toUpperCase()
    let variation = Number(req.params.variation)

    if (isNaN(variation)) {
        res.status(200).send({ status: 'failure', message: 'Variação inválida.' })
        return
    }

    stockHistoryModel.findOne({ 'name': name }, 'historic.date historic.variation historic.close -_id' , (err, stockHistories) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else {
            if (stockHistories) {
                if (stockHistories.historic.length > 0) {
                    let stocksHistoriesByVariation = stockHistories.historic.filter((stockHistory) => {
                        return stockHistory.variation < variation
                    })
                    res.status(200).send({ status: 'success', message: stocksHistoriesByVariation })
                } else
                    res.status(200).send({ status: 'success', message: [] })
            } else
                res.status(200).send({ status: 'failure', message: "Esta ação/bolsa não está registrada." })
        }
    })
}

exports.getStockDatesByNameAndVariationRange = (req, res, next) => {
    let name = req.params.name.toUpperCase()
    let variationLow = Number(req.params.variationLow)
    let variationHigh = Number(req.params.variationHigh)

    if (isNaN(variationLow) || isNaN(variationHigh)) {
        res.status(200).send({ status: 'failure', message: 'Variação(ões) inválida(s).' })
        return
    }

    stockHistoryModel.findOne({ 'name': name }, 'historic.date historic.variation historic.close -_id' , (err, stockHistories) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else {
            if (stockHistories) {
                if (stockHistories.historic.length > 0) {
                    let stocksHistoriesByVariation = stockHistories.historic.filter((stockHistory) => {
                        return stockHistory.variation >= variationLow && stockHistory.variation < variationHigh
                    })
                    res.status(200).send({ status: 'success', message: stocksHistoriesByVariation })
                } else
                    res.status(200).send({ status: 'success', message: [] })
            } else
                res.status(200).send({ status: 'failure', message: "Esta ação/bolsa não está registrada." })
        }
    })
}

exports.getNumberOfStocksHistories = (req, res, next) => {
    stockHistoryModel.countDocuments({}, (err, count) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', count: count })
    })
}