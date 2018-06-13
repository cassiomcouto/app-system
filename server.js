var express = require('express');
var app = express();
//Variaveis configuração cluster
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

//
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // De 1 a 32 processadores
 if(numCPUs > 32 ) {
 	numCPUs = 32;
 }

  for (let i = 0; i < numCPUs ; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });


 } else {

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))



app.get('/', function (req, res) {
res.send('Hello World!');
});

app.listen(3000,"localhost", function () {
console.log('Example app listening on port 3000!');
});
}
