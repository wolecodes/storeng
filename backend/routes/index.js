const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignup.js");

router.post("/signup", userSignUpController);

module.exports = router;
