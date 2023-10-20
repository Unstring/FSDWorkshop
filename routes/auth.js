const express = require("express");

const router = express.Router();

const { signin, signout, signup,socialLogin} = require("../controllers/auth.js");
const { userById } = require("../controllers/users");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.param("UserId", userById);

module.exports = router;
