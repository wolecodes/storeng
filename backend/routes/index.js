const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignup.js");

const userSignInController = require("../controller/user/userSignin.js");

const userDetailContoller = require("../controller/user/userDetail.js");
const authToken = require("../middleware/authToken.js");
const userLogout = require("../controller/user/userLogout.js");
const allUsers = require("../controller/user/allUsers.js");
const updateUser = require("../controller/user/updateUser.js");
const UploadProductController = require("../controller/product/uploadProduct.js");
const getProductController = require("../controller/product/getProduct.js");
const updateProductController = require("../controller/product/updateProduct.js");
const getProductCategory = require("../controller/product/getProductCategory.js");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct.js");
const getProductDetails = require("../controller/product/getProductDetails.js");
const addToCartController = require("../controller/user/addToCartController.js");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct.js");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct.js");

//User
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
router.get("/get-productCategory", getProductCategory);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);

//Add to cart

router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);

router.get("/view-card-product", authToken, addToCartViewProduct);

module.exports = router;
