const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Question = require('./database/Question');
const Response = require('./database/Response');
const app = express();

// Database
connection.authenticate()
    .then(() => {
        console.log('Database connected!');
    }).catch(err => {
        console.log(err);
    });


// informando ao express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// BobyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
app.get('/', (req, res) => {
    Question.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then((questions) => {
        res.render('index', {
            questions: questions
        });
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/questions', (req, res) => {
    res.render('questions')
});

app.get('/question/:id', (req, res) => {
    var id = req.params.id;
    Question.findOne({
        where: { id: id }
    }).then((question) => {

        if (question !== null) {
            Response.findAll({ where: { question_id: question.id }, order: [['id', 'DESC']] })
                .then((responses) => {
                    res.render('question', {
                        question: question,
                        responses: responses
                    });
                });
        } else {
            console.log(id);
            res.redirect('/');
        }
    });
});

app.post('/questionssave', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    // Responsável por criação INSERT
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/response', (req, res) => {
    var body = req.body.body;
    var questionId = req.body.questionId;

    Response.create({
        question_id: questionId,
        body: body
    }).then(() => {
        res.redirect('/question/' + questionId);
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(8080, () => {
    console.log('Listening on http://localhost:8080');
});
