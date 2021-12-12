const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
const passprotckeck = require("../middlewares/passportmid");

router.route("/adress").post(passprotckeck.isLoggedIn,controller.addaddress);
router.route("/").get(passprotckeck.isLoggedIn,controller.getmyuser);

module.exports = router;