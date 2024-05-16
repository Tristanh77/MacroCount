const Profile = require('../../models/profile');

module.exports = {
  create,
  update,
  delete: deleteGoal,
  index,
  show,
};

async function create(req, res) {
  try {
    const profile = await Profile.create({ ...req.body, user: req.user._id });
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(profile);
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
    const goals = await Goal.find({ user: req.user._id });
    res.json(goals);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
    if (!goal) throw new Error();
    res.json(goal);
  } catch (err) {
    res.status(404).json('Goal not found');
  }
}
