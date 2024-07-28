const userModel = require("../../models/userModel");

async function userDetailController(req, res) {
  try {
    console.log("User ID from request:", req.userId);

    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details retrieved successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailController;
