const express = require('express')
const router = express.Router()
const controller = require('../controllers/articleController')

router.get('/', controller.getAllArticles)
router.get('/getArticle/:id', controller.getArticleById)
router.get('/getArticlesByDate/:date', controller.getArticlesByDate)
router.get('/getArticlesAfter/:date', controller.getArticlesByAfterDate)
router.get('/getArticlesBefore/:date', controller.getArticlesByBeforeDate)
router.get('/getArticlesByDateRange/:dateLow/:dateHigh', controller.getArticlesByDateRange)
router.get('/getArticleByURL/:url', controller.getArticleByURL)
router.get('/getNumberOfArticles/', controller.getNumberOfArticles)
router.put('/newArticle/', controller.newArticle)

module.exports = router