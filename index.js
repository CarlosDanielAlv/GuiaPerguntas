const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// informando ao express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// BobyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/questions', (req, res) => {
    res.render('questions')
});

app.post('/questionssave', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    
    res.send(`Form Received! Title: ${title}, description: ${description}::: Response = Impossível`);
});

app.listen(8080, () => {
    console.log('Listening on http://localhost:8080');
});
