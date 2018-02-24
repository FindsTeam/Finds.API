const express = require("express");
const router = express.Router();

const ctrLogin = require("../controllers/users");

router.get("/login/:email/:name", ctrLogin.login);

module.exports = router;