const UserModel = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = (req,res) =>{
    const {name,email,age,mobile,password} =req.body;
    console.log(req.body)

    bcrypt.hash(password,10)
    .then(hash =>{
        UserModel.create({name,email,age,mobile,password:hash})
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          // User not found
          return res.status(401).json('Unauthorized');
        }
        // Check if password matches
        bcrypt.compare(password, user.password)
          .then(isPasswordValid => {
            if (!isPasswordValid) {
              // Incorrect password
              return res.status(401).json('Unauthorized');
            }
  
            // Generate JWT token
            const token = jwt.sign({ userId: user._id, email: user.email, role:user.role}, 'yourSecretKey', { expiresIn: '1d' });
            return res.json({ token });
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json('Internal Server Error');
          });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json('Internal Server Error');
      });
  };

  module.exports = {
    createUser,
    loginUser
  }