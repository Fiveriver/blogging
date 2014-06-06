var express = require('express'), app = express(), // 
server = require("http").createServer(app), io = require("socket.io").listen(server), //
nicknames = [];
 
server.listen(3000);
 
app.get("/", function(req, res) {
 res.sendfile(__dirname + "/index.html");
});
 
io.sockets.on("connection", function(socket) {
 socket.on("new user", function(data, callback) {
  if (nicknames.indexOf(data) != -1) {
   callback(false);
  } else {
   callback(true);
   socket.nickname = data;
   nicknames[socket.nickname] = socket;
   updateNicknames();
  }
 });
 
 function updateNicknames() {
  io.sockets.emit("usernames", Object.keys(nicknames));
 }
 
 socket.on("send message", function(data, callback) {
  var msg = data.trim(); // 앞과 뒤의 공백 제거
  console.log("after trimming message is : " + msg);
  if (msg.substr(0, 3) === "/w ") {
   msg = msg.substr(3);
   var ind = msg.indexOf(" ");
   if (ind !== -1) {
    var name = msg.substring(0, ind);
    var sendmsg = msg.substring(ind + 1);
    console.log("whisper name send is : " + name + ", " + name.length);
    console.log("nicknames is : " + nicknames + ", " + (name in nicknames));
    if (name in nicknames) {
     nicknames[name].emit("whisper", {
      msg : sendmsg,
      nick : socket.nickname
     });
 
     console.log("whisper message send is : " + msg);
    } else {
     callback("Error! Enter a valid user.");
    }
   } else {
    callback("Error! Please enter a message for your whisper.");
   }
  } else {
   io.sockets.emit("new message", {
    msg : data,
    nick : socket.nickname
   });
  }
 });
 
 socket.on("disconnect", function(data) {
  if (!socket.nickname)
   return;
  nicknames.splice(nicknames.indexOf(socket.nickname), 1);
  updateNicknames();
 });
});