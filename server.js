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


const Sam = 'http://13.52.76.182',
    Justin = 'http://3.101.18.94',
    Kim = 'http://52.53.211.176';

app.all("/api/listings", function(req, res) {
    apiProxy.web(req, res, {target: Sam});
});

app.all('/api/similarListings', (req, res) => {
  apiProxy.web(req, res, {target: Justin});
})
app.all('/api/nearbyListings', (req, res) => {
  apiProxy.web(req, res, {target: Justin});
})

app.all("/api/home1", function(req, res) {
  apiProxy.web(req, res, {target: Kim});
});


app.listen(port, () => {
  console.log('Server is listening on port: ', port)
})