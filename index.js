const express = require('express');
const app = express();

// informando ao express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080, () => {
    console.log('Listening on http://localhost:8080');
});
