const express = require("express");
const router = express.Router();
const controller = require("../controller/salepost");

router.route("/").post(controller.postsalepost).get(controller.getsalepost);
router.route("/:id").get(controller.onesalepost);

module.exports = router;