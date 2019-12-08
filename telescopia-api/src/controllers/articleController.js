const mongoose = require('mongoose')

const indicatorSchema = mongoose.Schema({
    facebook: {
        likes: {
            type: Number,
            min: 0
        }
    },
    likes: {
        type: Number,
        min: 0
    },
    dislikes: {
        type: Number,
        min: 0
    }
})

const replySchema = mongoose.Schema({
    author_name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    indicators: indicatorSchema
})

const commentSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    author_name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    indicators: indicatorSchema,
    replies: [replySchema]
})

const articleSchema = mongoose.Schema({
    portal_name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    indicators: indicatorSchema,
    comments: [commentSchema]
})

const articleModel = mongoose.model('Articles', articleSchema)

exports.newArticle = (req, res, next) => {
    const saveArticleSchema = mongoose.model('Articles')
    new saveArticleSchema(req.body)
    .save()
    .then(() => {
        res.status(200).send({ status: 'success', message: `Notícia ${ req.body.title } cadastrada com sucesso!` })
    })
    .catch((error) => {
        res.status(200).send({ status: 'failure', message: 'Não foi possível cadastrar a notícia.' })
        console.log(`Ocorreu um erro ao cadastrar a notícia: ${ error }`)
    })
}

exports.getAllArticles = (req, res, next) => {
    articleModel.find({}, (err, articles) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: articles })
    })
}

exports.getArticleById = (req, res, next) => {
    let id = req.params.id
    articleModel.findById(id, (err, article) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: article })
    })
}

exports.getArticlesByDate = (req, res, next) => {
    let dateLow = new Date(req.params.date)
    let dateHigh = new Date(req.params.date)

    dateHigh.setDate(dateLow.getDate() + 1)

    articleModel.find({ date: { "$gte": dateLow, "$lt": dateHigh } }, (err, articles) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: articles })
    })
}

exports.getArticlesByAfterDate = (req, res, next) => {
    let date = new Date(req.params.date)
    articleModel.find({ date: { "$gte": date } }, (err, articles) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: articles })
    })
}

exports.getArticlesByBeforeDate = (req, res, next) => {
    let date = new Date(req.params.date)
    articleModel.find({ date: { "$lt": date } }, (err, articles) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: articles })
    })
}

exports.getArticlesByDateRange = (req, res, next) => {
    let dateLow = new Date(req.params.dateLow)
    let dateHigh = new Date(req.params.dateHigh)
    articleModel.find({ date: { "$gte": dateLow, "$lt": dateHigh } }, (err, articles) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else
            res.status(200).send({ status: 'success', message: articles })
    })
}

exports.getNumberOfArticles = (req, res, next) => {
    articleModel.countDocuments({}, (err, count) => {
        if (err) {
            res.status(200).send({ status: 'failure' })
            console.log(err)
        } else {
            res.status(200).send({ status: 'success', count: count })
        }
    })
}