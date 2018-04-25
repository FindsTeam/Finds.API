require("dotenv").config();

const chai = require("chai");
const should = chai.should();
const expect = chai.expect;

const io = require("socket.io-client");
const socketUrl = "http://localhost:" + process.env.PORT;
const options = {
  transports: ["websocket"],
  forceNew: true
};

describe("Testing test system", () => {
  describe("true === true", () => {
      it("should return true", () => {
          return (true === true);
      });
  });
});

describe("Testing chat API", () => {
  var client;

  beforeEach(function(done) {
    client = io.connect(socketUrl, options);

    client.on("connect", () => {
      console.log("connected");
      done();
    });

    client.on("disconnect", () => {
      console.log("disconnected...");
    });
  });

  it("should receive 'connected' event", (done) => {
    client.on("connected", () => {
      done();
    });
  });

  it("should emit message", (done) => {
    client.on("connected", () => {
      const message = "Hello!"
      client.emit("message", message);
      done();
    });
  });
});