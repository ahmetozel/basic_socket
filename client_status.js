const fs = require('fs')
const path = require('path')
var app = require('express')();
var server = require('http').Server(app, {
  cors: {
    origin: "https://localhost"
  }
});
/*
const server = require('https').createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
},app);
*/

var io = require('socket.io')(server);
//var mysql = require('mysql');
/*
var pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "android_paket"
});
*/

server.listen(3467);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

////////////////////////////////////////
  
io.sockets.on('connection', function(socket){

  socket.on('new_user', function(device_info){
    console.log(device_info);
    data = socket.id;
    socket.ID = data;
    io.sockets.emit('connected', data);
    //mysql_query('INSERT INTO pool (socket) VALUES ("'+data+'")');
  });
  socket.on('new_message', function(new_message){
    console.log(new_message);
    io.sockets.emit('new_message', new_message);
  });

  socket.on('disconnect', function(){
    
    io.sockets.emit('disconnected', socket.ID);
    //mysql_query('DELETE FROM pool WHERE socket="'+socket.ID+'"');
    //console.log(io.sockets);
    global.gc();
  });

});

setInterval(function(){
  global.gc();
  //console.log('GC done')
}, 1000*45);

////////////////////////////////////////
/*
function mysql_query(queryString)
{
  pool.getConnection(function(error,conn){
    conn.query(queryString, function (error,results){
      if(error){
        throw error;
      }
    });
    conn.release();
  });
}
*/

console.log('Baslatildi :)_3');
