const userModel = require("../models/userModel");
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

    const user = userModel.findOne({ email });

    if (user) {
      throw new Error("User already exits.");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    const saltRounds = 10;

    const myPlaintextPassword = password;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = await bcrypt.hashSync(myPlaintextPassword, salt);

    if (!hashPassword) {
      throw new Error("something is wrong");
    }
    const payload = {
      ...req.body,
      password: hashPassword,
    };

    // Creating a new user data object using userModel
    const userData = new userModel(payload);

    const saveUser = userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "user created successfully!",
    });
  } catch (err) {
    // Sending error response if any error occurs
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
