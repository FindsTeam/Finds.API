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
          console.log("joining room", room);
          socket.join(room);
        });

        socket.on("subscribe", (room) => {
          socket.emit("subscribed");
          console.log("joining room", room);
          socket.join(room);
        });

        socket.on("send message", (data) => {
          console.log("sending room post", data.room);
          socket.broadcast.to(data.room).emit("conversation private post", {
              message: data.message
          });
      });
      }
    });
  });

}