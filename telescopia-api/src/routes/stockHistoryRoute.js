const express = require('express')
const router = express.Router()
const controller = require('../controllers/stockHistoryController')

router.get('/', controller.getAllStocksHistory)
router.get('/getStocksNames/', controller.getStocksNames)
router.get('/getStockDatesByVariationAndName/:name/:variation/', controller.getStockDatesByVariationAndName)
router.put('/newStockHistory/', controller.newStockHistory)

module.exports = router