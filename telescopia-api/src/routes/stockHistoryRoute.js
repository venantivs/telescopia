const express = require('express')
const router = express.Router()
const controller = require('../controllers/stockHistoryController')

router.get('/', controller.getAllStocksHistory)
router.get('/getStocksNames/', controller.getStocksNames)
router.get('/getStockDatesByNameAndVariation/:name/:variation/', controller.getStockDatesByVariationAndName)
router.get('/getStockDatesByNameAndVariationGreaterThan/:name/:variation/', controller.getStockDatesByNameAndVariationGreaterThan)
router.get('/getStockDatesByNameAndVariationLessThan/:name/:variation/', controller.getStockDatesByNameAndVariationLessThan)
router.get('/getStockDatesByNameAndVariationRange/:name/:variationLow/:variationHigh/', controller.getStockDatesByNameAndVariationRange)
router.get('/getNumberOfStocksHistories/', controller.getNumberOfStocksHistories)
router.put('/newStockHistory/', controller.newStockHistory)

module.exports = router