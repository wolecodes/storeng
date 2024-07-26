const bcrypt = require("bcrypt");
const userModel = require("../models/userModel"); // Ensure you require your user model
const jwt = require("jsonwebtoken"); //json web token

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (isMatch) {
      // Generate a JWT token if password is correct
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      // Respond with success and token
      res.cookie("token", token, tokenOption).status(200).json({
        success: true,
        error: false, //  error set to false
        message: "Login in successful!",
        data: token,
      });
    } else {
      // Throw an error if password is incorrect
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
