const Profile = require('../models/profile');


module.exports = {
  create,
  update,
  delete: deleteProfile,
  index,
  show,
};

async function create(req, res) {
  try {
    console.log('Request user:', req.user); // Log the req.user object
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    const profile = await Profile.create({ ...req.body, user: req.user._id });
    res.status(201).json(profile);
  } catch (err) {
    console.error('Error creating profile:', err);
    res.status(400).json({ error: err.message, details: err });
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


async function deleteProfile(req, res) {
  try {
    await Profile.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {

    const profile = await Profile.find({ user: req.user._id });
    res.json(profile);

  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, user: req.user._id });
    if (!profile) throw new Error();
    res.json(profile);
  } catch (err) {
    res.status(404).json('Profile not found');
  }
}
