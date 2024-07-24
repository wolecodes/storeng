const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignup.js");

const userSignInController = require("../controller/userSignin.js");

const userDetailContoller = require("../controller/userDetail.js");
const authToken = require("../middleware/authToken.js");
const userLogout = require("../controller/userLogOut.js");
const allUsers = require("../controller/allUsers.js");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailContoller);
router.get("/userLogout", userLogout);

//Admin pannel
router.get("/all-user", authToken, allUsers);

module.exports = router;
