const Exercise = require('../models/exercise');
const { startOfDay, endOfDay } = require('date-fns');

module.exports = {
  create,
  update,
  delete: deleteExercise,
  index,
  show,
  daily,
};

async function create(req, res) {
  try {
    const exercise = await Exercise.create({ ...req.body, user: req.user._id });
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exercise);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteExercise(req, res) {
  try {
    await Exercise.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const exercises = await Exercise.find({ user: req.user._id });
    res.json(exercises);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const exercise = await Exercise.findOne({ _id: req.params.id, user: req.user._id });
    if (!exercise) throw new Error('Exercise not found');
    res.json(exercise);
  } catch (err) {
    res.status(404).json({ error: 'Exercise not found' });
  }
}

async function daily(req, res) {
  try {
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());
    const exercises = await Exercise.find({
      user: req.user._id,
      createdAt: { $gte: start, $lte: end },
    });
    res.json(exercises);
  } catch (err) {
    res.status(400).json(err);
  }
}
