const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Srini...!');
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log('Srini...!');

    await bcrypt.compare(password, user.password).then(function(result) {
      // result == true

      console.log(' Bycript Rlts'+ result);
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Change password function
// const changePassword = async (req, res) => {
//   const { email, oldPassword, newpassword } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Old password is incorrect' });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newpassword, salt);
//     await user.save();

//     res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


const changePassword = async (req, res) => {
    const { email, password } = req.body;
  
    //console.log(req.body);

    console.log('Srini...!123');

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) return res.status(401).json({ message: 'Old password is incorrect' });
  
      const salt = await bcrypt.genSalt(10);
      const saltPassword = await bcrypt.hash(password, salt);
      //await user.save();

      await user.updateOne({$set : { password : saltPassword }});
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

// Sign-up function
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { login, signupUser, changePassword };
