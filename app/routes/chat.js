const decode = require("jwt-decode");

const Users = require("../models/users");

module.exports = (socket) => {
  socket.emit("check token");
  socket.on("token", (token) => {
    const { email, nickname } = decode(token);
    Users.findOne({ email, nickname }, (err, user) => {
      if (user) {
        socket.emit("token is valid");

        socket.on("subscribe", (room) => {
          socket.emit("subscribed");
          console.log(user.nickname + " joins room", room);
          socket.join(room);

          socket.on("send message", (data) => {
            socket.to(data.room).emit("room message", {
                message: data.message
            });
          });
        });

        
      }
    });
  });

}