var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var path = require('path');
var url = require('url');


// console.log('../client/index.js');

// let absPathIndex = path.join(__dirname ,'../client/index.js');
// console.log(absPathIndex);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (req.method === "GET" && req.url === "/form") {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('./form.html').pipe(res);
    };

    if (req.method === 'POST' && req.url === '/form') {
      var formData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(
        `<h2>${formData.name}</h2> <p>${formData.email}</p> <p>${formData.age}</p>`
      );
    }
  })   
}

server.listen(5678, () => {
  console.log("server is running on 5678 port");
});