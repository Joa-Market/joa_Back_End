const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const loginRouter = require("./passport");
router.use("/", [loginRouter]);
router.use("/user",[userRouter]);
  
module.exports = router;