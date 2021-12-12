const express = require("express");
const router = express.Router();
const controller = require("../controller/salepost");
const passprotckeck = require("../middlewares/passportmid");

router.route("/").post(passprotckeck.isLoggedIn,controller.postsalepost).get(controller.getsalepost);
router.route("/:id").get(controller.onesalepost);

module.exports = router;