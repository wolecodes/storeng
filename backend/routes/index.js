const express = require("express");

const router = express.Router();
const axios = require('axios');

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
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct.js");

const filterProductController = require('../controller/product/filterProduct');

const paymentController = require("../controller/order/paymentController.js");
// const initializePayment = require("../controller/order/paymentController.js");
// const useWebHook = require('../controller/order/webhook.js')
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
router.get("/search", searchProduct);
router.post("/filter-product",filterProductController);

//Add to cart

router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);


//payment 
router.post("/make-payment",paymentController);
// router.post('/acceptpayment', initializePayment.acceptPayment);
// router.post('/webhook', useWebHook)
// router.get('/verifypayment/:reference', initializePayment.verifyPayment);
// router.post('/charge', initializePayment.chargeCard);


module.exports = router;
