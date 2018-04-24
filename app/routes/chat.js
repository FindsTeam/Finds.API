module.exports = (socket) => {
  socket.on("message", function(msg){
    console.log("message: " + msg);
  });
}