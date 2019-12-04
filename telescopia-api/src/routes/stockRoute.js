const express = require('express')
const router = express.Router()
const controller = require('../controllers/stockController')

router.get('/', controller.getAllStocks)
router.get('/getStock/:stockName/', controller.getStockByName)
router.get('/getNumberOfStocks/', controller.getNumberOfStocks)
router.put('/newStock/', controller.newStock)

module.exports = router