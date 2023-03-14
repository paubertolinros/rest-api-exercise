const router = require('express').Router();
const Show = require('../models/Show')

// @desc    Get all shows
// @route   GET /shows
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one show
// @route   GET /show/:id
// @access  Public
router.get('/:showId', async (req, res, next) => {
  const { showId } = req.params;
  try {
    const show = await Show.findById(showId);
    res.status(200).json(show);
  } catch (error) {
    next(error)
  }
});

// @desc    Add show
// @route   POST /shows
// @access  Public
router.post('/', async (req, res, next) => {
  // const { title, creator, launched, genre, image, description  } = req.body;
  try {
    const newShow = await Show.create(req.body);
    res.status(201).json(newShow);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one show
// @route   PUT /shows/:showId
// @access  Public
router.delete('/:showId', async (req, res, next) => {
  const { showId } = req.params;
  try {
    const deletedShow = await Show.findByIdAndDelete(showId);
    res.status(201).json(deletedShow);
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one show
// @route   DELETE /shows/:showId
// @access  Public
router.put('/:showId', async (req, res, next) => {
  const { showId } = req.params;
  try {
    const editedShow = await Show.findByIdAndUpdate(showId, req.body, { new: true });
    console.log(editedShow);
    res.status(204).json(editedShow);
  } catch (error) {
    next(error)
  }
});

module.exports = router;