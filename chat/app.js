var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res){
    fs.readFile('./index.html',function(error,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data,'utf-8');
    });
}).listen(8008,"192.168.1.178");
console.log('Server running at http://192.168.1.178:8008/');

var io = require('socket.io').listen(server);
var username ='';
io.sockets.on('connection',function(socket){
    socket.on('message',function(data){
        socket.broadcast.emit('otherMessage',data);

    });
    socket.on('username',function(data){
    	console.log(data.text);
    	username = data.text;
    	socket.broadcast.emit('otherUser',data);
    })
});