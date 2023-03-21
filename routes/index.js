const router = require('express').Router();

// @desc    Base URL of the API
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  //res.status(200).json({ message: 'Connected' });
  res.send('REST API')
});

module.exports = router;
