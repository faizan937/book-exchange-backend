const User = required("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, location } = req.body;
  try {
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({error:"Email already registered"});
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, location });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error:"Server error during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};