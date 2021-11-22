var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req,res){

    var store = '' ;
    if(req.method=='POST'&& req.url==='/'){
        req.on('data',(chunk) =>{
            store = store + chunk;
        });
        req.on('end',()=>{
            console.log(store);
            res.write(store);
            res.end();
        });
    }
}

server.listen(3456,()=>{
    console.log('Server is Listening');
});