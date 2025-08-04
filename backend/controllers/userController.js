import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  // const { email, password } = req.body;
  // const standardEmail = email.toLowerCase().trim()
  // try {
   
  //   // Find user 
  //   const user = await User.findOne({ email: standardEmail });
    
  //       // res.status(200).json({
  //   //   _id: user._id,
  //   //   name: user.name,
  //   //   email: user.email,
  //   //   token,
  //   // });
     
  //      console.log(user);
  //  if (user && (await user.matchPassword(password))) {
  //      res.status(200).json({
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       token,
  //     })

  //   } else {

  //     return res.status(401).json({ message: 'Invalid email or password' })

  //   }

  // } catch (error) {

  //   return res.status(500).json({ message: error.message })

  // } 
  try {

    const user = await User.findOne({ email: req.body.email });
// console.log(user)
    if (!user) {

      return res.status(401).json({ message: "Invalid email or password" });

    }

    const correctPw = await user.isCorrectPassword(req.body.password);
// console.log(correctPw)
    if (!correctPw) {
console.log("wrongPw")
      return res.status(401).json({ message: "Invalid email or password!" });

    }

    const token = signToken(user);

    res.status(200).json({ token, user });

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Server error. Please try again later" });

  }
}

// @desc    Get current user
// @route   GET /api/users/me
// @access  Private
export const getCurrentUser = async (req, res) => {
const user = await User.findById(req.params.id).select('-password')

  if (user) {

    res.json(user)

  } else {

    res.status(404).json({ message: 'User not found' })

  }
};
  
