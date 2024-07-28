const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

/**
 * Controller function for user sign up.
 *
 * @param {Object} req - The request object containing user data in the body.
 * @param {Object} res - The response object to send back the result.
 */

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;
    console.log("Request body:", req.body);

    if (!email || !password || !name) {
      throw new Error("Please provide email, password, and name.");
    }

    const user = await userModel.findOne({ email });
    console.log("Existing user:", user);

    if (user) {
      throw new Error("User already exists.");
    }

    // Proceed with user creation
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
