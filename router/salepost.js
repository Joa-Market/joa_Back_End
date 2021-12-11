const express = require("express");
const router = express.Router();
const controller = require("../controller/salepost");

router.route("/").post(controller.postsalepost);

module.exports = router;