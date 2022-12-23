const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Question = require('./database/Question');
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
    Question.findAll({ raw: true })
        .then((questions) => {
            res.render('index',{
                questions: questions
            });
        }).catch((err) => {
            console.log(err);
        });
});

app.get('/questions', (req, res) => {
    res.render('questions')
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

app.listen(8080, () => {
    console.log('Listening on http://localhost:8080');
});
