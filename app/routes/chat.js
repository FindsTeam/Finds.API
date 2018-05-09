const decode = require("jwt-decode");

const Users = require("../models/users");
const Dialogs = require("../models/dialogs");

const parseParticipants = (room) => {
  const separator = "+";
  if (room.includes(separator)) {
    return room.split(separator).sort();
  }
  return [];
};

module.exports = (socket) => {
  socket.emit("check token");
  socket.on("token", (token) => {
    const { email, nickname } = decode(token);

    Users.findOne({ email, nickname }, (err, user) => {
      if (user) {
        socket.emit("token is valid");

        socket.on("subscribe", (room) => {
          socket.emit("subscribed");
          socket.join(room);

          socket.on("message", (data) => {
            const message = {
              from: data.from,
              date: Date.now(),
              text: data.message
            };

            const participants = parseParticipants(room);

            Dialogs.findOneAndUpdate(
              { participants },
              { $push: { messages: message }},
              { upsert: true }, (error, dialog) => {
                if (!error) {
                  socket.to(data.room).emit("answer", {
                    message: data.message
                  });
                }
            });
          });
        });
      } else {
        socket.emit("error");
      }
    });
  });
};