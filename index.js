const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 3001

const companies_model = require('./companies_model')

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/:limit/:who/:how', (req, res) => {
    companies_model.getCompanies(Number.parseInt(req.params['limit']), req.params['who'], req.params['how'])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/add_companies', (req, res) => {
    companies_model.createCompanies(req.body)
    .then(response => {
    res.status(200).send(response);
    })
    .catch(error => {
    res.status(500).send(error);
    })
})

app.get('/search_data/:query/:limit/:who/:how', (req, res) => {
    companies_model.searchCompanies(req.params['query'], Number.parseInt(req.params['limit']), req.params['who'], req.params['how'])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})