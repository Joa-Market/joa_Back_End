const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

router.route("/adress").post(controller.addaddress);

module.exports = router;