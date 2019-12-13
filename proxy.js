const http = require('http');
const httpProxy = require('http-proxy');
const chalk = require('chalk');

const allowedOrigins = ['http://localhost:4200'];
const proxy = httpProxy.createProxyServer({});
const filePath = process.argv[1];
const splitFilePath = filePath.split('\\');
const fileName = splitFilePath[splitFilePath.length - 1];
const targetHost = 'https://accounts.spotify.com';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, if-modified-since');
  res.setHeader('Access-Control-Max-Age', 60 * 60 * 24 * 30);

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
  }
  proxy.web(req, res, {
    target: targetHost
  }, function (e) {
    console.log(e);
  });
  console.log('test');
  proxy.on('error', function(error) {
    console.log(error);
  });
}).listen(8000);
