// controllers/goals.js

const Goal = require('../models/goals');

module.exports = {
  create,
  update,
  delete: deleteGoal,
  index,
  show,
};

async function create(req, res) {
  try {
    const goal = await Goal.create({ ...req.body, user: req.user._id });
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(goal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteGoal(req, res) {
  try {
    await Goal.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    console.log('Request user:', req.user); // Log the request user
    const goals = await Goal.find({ user: req.user._id });
    res.json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
    if (!goal) throw new Error('Goal not found');
    res.json(goal);
  } catch (err) {
    res.status(404).json({ error: 'Goal not found' });
  }
}
