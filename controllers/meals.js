const Meal = require('../models/meal');
const { startOfDay, endOfDay } = require('date-fns');

module.exports = {
  create,
  update,
  delete: deleteMeal,
  index,
  show,
  dailyMeals,
};

async function create(req, res) {
  try {
    const meal = await Meal.create({ ...req.body, user: req.user._id });
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(meal);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteMeal(req, res) {
  try {
    await Meal.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const meals = await Meal.find({ user: req.user._id });
    res.json(meals);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const meal = await Meal.findOne({ _id: req.params.id, user: req.user._id });
    if (!meal) throw new Error('Meal not found');
    res.json(meal);
  } catch (err) {
    res.status(404).json({ error: 'Meal not found' });
  }
}

async function dailyMeals(req, res) {
  try {
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());
    const meals = await Meal.find({ user: req.user._id, createdAt: { $gte: start, $lte: end } });
    res.json(meals);
  } catch (err) {
    res.status(400).json(err);
  }
}
