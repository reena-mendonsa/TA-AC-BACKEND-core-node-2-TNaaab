
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');


var server = http.createServer(handleRequest);

var usersPath = __dirname + '/users/';

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url, true)
  var store = "";
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    // handle all routes
    if (req.url === '/users' && req.method === 'POST'){
      var username = JSON.parse(store).username;
      fs.open(usersPath + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
           return res.end(`${username} created successfully`)
          })
        })
         
      })
    }
    // GET REquest

    if (parsedUrl.pathname === '/users' && req.method === 'GET') {
      var username = parsedUrl.query.username;
      fs.readFile(usersPath + username + '.json', (err, content) => {
         if (err) return console.log(err);
        res.setHeader(`Content-Type`, `application/json`);
       return res.end(content);
      })
    }

    // Update data

    if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
      var username = parsedUrl.query.username;
      fs.open(usersPath + username + '.json', 'r+', (err, fd) => {
        if(err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
             return res.end(`${username} updated succesfully`)
            })
          })
        })
      })
    }
    
    //Delete

    if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
      var username = parsedUrl.query.username;
      fs.unlink(usersPath + username + '.json', (err) => {
        if (err) return console.log(err);
       return res.end(`${username} is deleted`);
      })
    }

    //other requests

    res.statusCode = 404;
    res.end('Page not found');

  })
}

server.listen(3000, () => {
  console.log('server is listening on port 3k');
})