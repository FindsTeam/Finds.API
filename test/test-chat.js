require("dotenv").config();
require("../app.js");

const chai = require("chai");
const should = chai.should();
const expect = chai.expect;

const io = require("socket.io-client");
const socketUrl = "http://localhost:" + process.env.PORT;
const options = {
  transports: ["websocket"],
  forceNew: true
};

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1EWkZNVE00T0RSRE1UVTRSalV6TVVFNU9FTkZOREZDTWtWR1JVUkdOall5TTBNNE1UVXdSZyJ9.eyJuaWNrbmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdEB0ZXN0LnRlc3QiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvZGQ0NmE3NTZmYWFkNDcyN2ZiNjc5MzIwNzUxZjZkZWE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ0ZS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wNC0yM1QxOTo1MjozOS42MjVaIiwiZW1haWwiOiJ0ZXN0QHRlc3QudGVzdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9mcmVlYmVlLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YWRlMzk4NzdmNDdmZDYxNDFmMzI5NWIiLCJhdWQiOiJ1OFhJakxhelZ3enhyTDNsNGZqck15VFNDdU5sdmxNOCIsImlhdCI6MTUyNDUxMzE2NSwiZXhwIjoxNTI0NTQ5MTY1LCJhdF9oYXNoIjoiMVRQT19VM3RVXy1lNnRnT3I4ZXJGZyIsIm5vbmNlIjoieVVQQkp2d0Juc21SUDI2Qm93ZHZGcHlmdWRNWFllUDYifQ.SOVMFEdXd3jyYTiOJ3pTnu31sXYGjz9JO6JX820MEQvGNttfg-J0ka2qpoB-I3PpIzACMeN7hjiG9J1h2kibhCIkDFOg2UXWVeTaBPtn_Frj4Z3-AdTH-VeZ8bIK64uIKP7xZMJgujRKbezTcnymRA9MGJAze6lCywuJA_fYJFjsANo3JI_ydwsJ3fkLyyEEI0WtAAXjqW2rvcpRH4f3x-pS1cXVarAc0_ZkZWYSHRsLiZrAnIAxoMu7Wf2JnGQrAAS5wZuuo4MNKa78FVptUXLESwwJ2U6niEcWHF5xKaw6aehKyDAohoI9bTbfRqbe3E7aIjA2MI30x3RtwfoQTQ";

describe("Testing test system", () => {
  describe("true === true", () => {
      it("should return true", () => {
          return (true === true);
      });
  });
});

describe("Testing chat API with a single client", () => {
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
  it("Client", () => {
    it("should receive 'checkToken' event", (done) => {
      client.on("check token", () => {
        done();
      });
    });

    it("should emit a token", (done) => {
      client.on("check token", () => {
        client.emit("token", token);
        client.on("token is valid", () => {
          done();
        });
      });
    });

    it("should emit a token", (done) => {
      client.on("check token", () => {
        client.emit("token", token);
        client.on("token is valid", () => {
          done();
        });
      });
    });
  });
});

describe("Clients", () => {
  var client;

  beforeEach(function(done) {
    clientOne = io.connect(socketUrl, options);
    clientTwo = io.connect(socketUrl, options);

    clientOne.on("connect", () => {
      clientOne.on("check token", () => {
        clientOne.emit("token", token);
        clientOne.on("token is valid", () => {
        });
      });
    });

    clientTwo.on("connect", () => {
      clientTwo.on("check token", () => {
        clientTwo.emit("token", token);
        clientTwo.on("token is valid", () => {
          done();
        });
      });
    });
  });

  it("should join a room", (done) => {
    const roomId = "randomid";

    clientOne.emit("subscribe", roomId);
    clientTwo.emit("subscribe", roomId);

    clientOne.on("subscribed", () => {
      clientTwo.on("subscribed", () => {
        done();
      });
    });
  });
  
  it("should transfer single message", (done) => {
    const roomId = "randomid";
    const message = "It's a message";

    clientOne.emit("subscribe", roomId);
    clientTwo.emit("subscribe", roomId);

    clientOne.on("subscribed", () => {
      clientTwo.on("subscribed", () => {
        clientOne.emit("send message", {
          room: roomId,
          message
        });
      });
    });

    clientTwo.on("room message", (data) => {
      expect(message).to.be.equal(data.message);
      done();
    });
  });
});