var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLocaleLowerCase();
        
function serveStaticFile(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);  }});}
    
    switch(path){
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
            
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        
        default:
            serveStaticFile(res, '/public/404.html', 'text/html');
            break;
    }
    
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to end session.')