const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignup.js");

const userSignInController = require("../controller/userSignin.js");

const userDetailContoller = require("../controller/userDetail.js");

const authToken = require("../middleware/authToken.js");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailContoller);

module.exports = router;
