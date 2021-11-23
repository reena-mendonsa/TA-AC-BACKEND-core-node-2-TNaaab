// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const querystring = require('querystring');
// const path = require('path');

// let server = http.createServer(handleRequest);

// let usersPath = __dirname + `/users/`;
// console.log(usersPath,"usersPath");

// function handleRequest(req, res) {
//   let parsedUrl = url.parse(req.url, true);
//   console.log(parsedUrl, "parsedUrl")
//   let pathName = parsedUrl.pathname;
//   console.log(pathName,"pathName");
//   var store = '';
//   req.on('data', (chunk) => {
//     store += chunk;
//   });

//   req.on('end', () => {
//     if ((req.method === 'POST', pathName === '/users')) {
//       var username = JSON.parse(store).username;
//       console.log(username,"username");
//       fs.open(usersPath + username + '.json', 'wx', (err, fd) => {
//         if (err) return console.log(err);
//         fs.writeFile(fd, store, (err) => {
//           if (err) return console.log(err);
//           fs.close(fd, () => {
//             return res.end(`${username} registered successfully`);
//           });
//         });
//       });
//     }

//     if (pathName === '/users' && req.method === 'GET') {
//       var username = parsedUrl.query.username;
//       fs.readFile(usersPath + username + '.json', (err, content) => {
//         if (err) return console.log(err);
//         res.setHeader('Content-Type', 'application/json');
//         return res.end(content);
//       });
//     }

//     if (pathName === '/users' && req.method === 'PUT') {
//       var username = parsedUrl.query.username;
//       fs.open(usersPath + username + '.json', 'r+', (err, fd) => {
//         if (err) return console.log(err);
//         fs.ftruncate(fd, (err) => {
//           if (err) return console.log(err);
//           fs.writeFile(fd, store, (err) => {
//             if (err) return console.log(err);
//             fs.close(fd, () => {
//               return res.end(`${username} Updated Successfully`);
//             });
//           });
//         });
//       });
//     }

//     if (pathName === '/users' && req.method === 'DELETE') {
//       var username = parsedUrl.query.username;
//       fs.unlink(usersPath + username + '.json', (err) => {
//         if (err) return console.log(err);
//         return res.end(`${username} Deleted Successfully`);
//       });
//     }

//     res.statusCode = 404;
//     res.end('Page not found');
//   });
// }

// server.listen(3000, 'localhost', () => {
//   console.log('Server is listning on port 3000!');
// });

//Refactor

var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');


var server = http.createServer(handleRequest);

var usersPath = __dirname + '/users/'

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
    // 

    if (parsedUrl.pathname === '/users' && req.method === 'GET') {
      var username = parsedUrl.query.username;
      fs.readFile(usersPath + username + '.json', (err, content) => {
         if (err) return console.log(err);
        res.setHeader(`Content-Type`, `application/json`);
       return res.end(content);
      })
    }

    // 

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
    
    //

    if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
      var username = parsedUrl.query.username;
      fs.unlink(usersPath + username + '.json', (err) => {
        if (err) return console.log(err);
       return res.end(`${username} is deleted`);
      })
    }

    //

    res.statusCode = 404;
    res.end('Page not found');

  })
}

server.listen(3000, () => {
  console.log('server is listening on port 3k');
})