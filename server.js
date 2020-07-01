const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')
const express = require('express')
const path = require('path')
const app = express()
const port = 5555;
const apiProxy = httpProxy.createProxyServer()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/client/dist')))


const Sam = 'http://localhost:3001',
    Justin = 'http://localhost:3003',
    Matthew = 'http://localhost:7777',
    Kim = 'http://localhost:3333';

app.all("/api/listings", function(req, res) {
    apiProxy.web(req, res, {target: Sam});
});

app.all('/api/similarListings', (req, res) => {
  apiProxy.web(req, res, {target: Justin});
})
app.all('/api/nearbyListings', (req, res) => {
  apiProxy.web(req, res, {target: Justin});
})

app.all('/reviews', (req, res) => {
  apiProxy.web(req, res, {target: Matthew});
})
app.all('/features', (req, res) => {
  apiProxy.web(req, res, {target: Matthew});
})
app.all('/reviews/vote/:id/:up', (req, res) => {
  apiProxy.web(req, res, {target: Matthew});
})

app.all("/api/home1", function(req, res) {
  apiProxy.web(req, res, {target: Kim});
});


app.listen(port, () => {
  console.log('Server is listening on port: ', port)
})