const express = require('express')
const router = express.Router()
const controller = require('../controllers/stockHistoryController')

router.get('/', controller.getAllStocksHistory)
router.put('/newStockHistory/', controller.newStockHistory)

module.exports = router