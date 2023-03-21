const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middlewares/jwt');
const saltRounds = 10;

// @desc    SIGN UP new user
// @route   POST /auth/signup
// @access  Public
router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body;
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: 'Please fill all the fields to sign up' });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Not a valid email format' });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at lesat 6 characters and contain at least one number, one lowercase and one uppercase letter' });
    return;
  }
  try {
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      res.status(400).json({ message: `User already exists with email ${email}` })
      return;
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ email, hashedPassword, username });
      res.status(201).json({ data: newUser });
    }
  } catch (error) {
    next(error)
  }
});

// @desc    LOG IN new user
// @route   POST /auth/signup
// @access  Public
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: 'Please fill all the fields to login' });
    return;
  }
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      res.status(404).json({ succes: false, message: `No user registered by email ${email}` })
      return;
    } else {
      const passwordMatches = bcrypt.compareSync(password, userInDB.hashedPassword);
      if (passwordMatches) {
        const payload = {
          email: userInDB.email,
          username: userInDB.username,
          _id: userInDB._id
        }
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "30d" }
        );
        res.status(200).json({authToken: authToken})
      } else {
        res.status(401).json({succes: false, message: 'Unable to authenticate user'})
      }
    }
  } catch (error) {
    next(error)
  }
});

// @desc    GET logged user
// @route   GET /auth/me
// @access  Private
router.get('/me', isAuthenticated, (req, res, next) => {
  console.log("Whose token is on the request:", req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;