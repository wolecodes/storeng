const productModel = require("../../models/productModel");

const getProductCategory = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    console.log("category", productCategory);

    //define an array of product Category
    const productByCategory = [];

    for (category of productCategory) {
      const product = await productModel.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: "product category",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductCategory;
