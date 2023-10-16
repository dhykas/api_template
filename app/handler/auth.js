const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

     // Generate a token
    const token = jwt.sign({ id: user.id, email: user.email }, "139ui&^*&$(^19eu1me0q2hdh8*&^*%^*dd",{ expiresIn: "2h"});
    user.token = token;
    
    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate a token
    const token = jwt.sign({ id: user.id, email: user.email }, "139ui&^*&$(^19eu1me0q2hdh8*&^*%^*dd",{ expiresIn: "2h", });
      return res.json({
        message: 'Login successful',
        token,
        user
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  

module.exports = {
  register,
  login
};
