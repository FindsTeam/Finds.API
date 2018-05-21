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

const handleMessage = (socket, room, data) => {
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
        socket.to(room).emit("answer", {
          message: data.message
        });
      }
  });
};

const handleRecent = (socket, room) => {
  const participants = parseParticipants(room);

  Dialogs.findOneAndUpdate(
    {participants},
    {},
    { upsert: true }, (error, dialog) => {
    if (dialog) {
      socket.emit("recent messages", dialog.messages);
    } else {    
      socket.emit("error");
    }
  });
};

module.exports = (socket) => {
  socket.emit("check token");
  socket.on("token", (token) => {
    const { email, nickname } = decode(token);

    Users.findOne({ email, nickname }, (err, user) => {
      if (user) {
        socket.emit("token is valid");

        socket.on("subscribe", (room) => {
          socket.join(room);
          socket.emit("subscribed");

          socket.on("message", (data) => handleMessage(socket, room, data));
          socket.on("recent", () => handleRecent(socket, room));
        });
      } else {
        socket.emit("error");
      }
    });
  });
};