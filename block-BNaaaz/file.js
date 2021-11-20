
let http = require('http');
let fs = require('fs')
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3001, () => {
  console.log('Hello World');
})