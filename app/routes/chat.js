module.exports = (socket) => {
  socket.emit("connected");
  socket.on("message", (message) => {
    console.log("message: " + message);
  });
}