const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignup.js");

const userSignInController = require("../controller/userSignin.js");

const userDetailContoller = require("../controller/userDetail.js");
const authToken = require("../middleware/authToken.js");
const userLogout = require("../controller/userLogOut.js");
const allUsers = require("../controller/allUsers.js");
const updateUser = require("../controller/updateUser.js");
const UploadProductController = require("../controller/uploadProduct.js");
const getProductController = require("../controller/getProduct.js");
const updateProductController = require("../controller/updateProduct.js");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailContoller);
router.get("/userLogout", userLogout);

//Admin pannel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//upload Product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
module.exports = router;
