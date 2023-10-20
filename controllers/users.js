/* eslint-disable no-underscore-dangle */
const _ = require("lodash");
const User = require("../model/user.js");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "user is not found" });
    }

    req.profile = user;
    next();
  });
};
exports.allUsers = (req, res, next) => {
  User.find((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(user );
  }).select("name email created updated");
};
exports.getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};
exports.updateUser = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "you're not authorized to perform this action",
      });
    }
    user.password = undefined;
    res.json({ user });
  });
};
exports.deleteUser = (req, res) => {
  const user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ message: "user deleted successfully" });
  });
};
