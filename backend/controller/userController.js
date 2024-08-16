const UserModel = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  try {
    // Await the result of findOne to check if the user already exists
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists, please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const { name, email, age, mobile } = req.body;

    // Create a new user with the hashed password
    const newUser = await UserModel.create({ name, email, age, mobile, password: hash });

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: true, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "Invaild email or password" })
    }

    //compared the password with stored hash password 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: true, message: "Invaild email or password" })
    }

    //Generate access and refresh token 
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    //save the refresh token in database 
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({
      error: false,
      message: "login successful",
      accessToken,
      refreshToken

    })
  }catch(err){
      res.status(500).json({error:true,message:err.message});
  }
};

const logoutUser = async (req, res) => {

}

module.exports = {
  createUser,
  loginUser,
};
