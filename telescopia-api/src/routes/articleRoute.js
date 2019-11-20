const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleController');

router.get('/', controller.getAllArticles);
router.get('/getArticle/:id', controller.getArticle);
router.put('/newArticle', controller.newArticle);

module.exports = router;