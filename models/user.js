const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    // photoUrl: String, // string from aws!
    // bio: String
  },
  {
    timestamps: true,
  }
);


// res.json with a user document in it!
// so our signup controller and login controller
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  },
});
/// in controller

// this is if you populate the user
// post.populate('user') // <- make sure we remove the password!
userSchema.set("toObject", {
  transform: (doc, ret, opt) => {
    delete ret.password;
    return ret;
  },
});

// DO NOT DEFINE instance methods with arrow functions,
// they prevent the binding of this
// user.save() or User.create()
userSchema.pre("save", function (next) {
  // 'this' will be set to the current document
  const user = this;
  // check to see if the user has been modified, if not proceed
  // in the middleware chain
  if (!user.isModified("password")) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next(); // continue doing what you were doing, put the user 
    // object in the db with the hash as the password!
  });
});

// We use this in the login function in the controllers!
userSchema.methods.comparePassword = function (tryPassword, cb) {
  console.log(cb, " this is cb");
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch); // this passes true/false to the user.comparePassword
    // in the controller login function
  });
};

module.exports = mongoose.model("User", userSchema);
