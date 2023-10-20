const express = require("express");

const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

const router = express.Router();
router.get("/users", allUsers);
router.param("userId", userById);
router.get("/user/:userId", getUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

module.exports = router;
