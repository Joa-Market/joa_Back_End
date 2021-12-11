const express = require("express");
const passport = require("passport");
const passportlogin = require("../controller/passprotlogin")
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportmid");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", isNotLoggedIn, passportlogin.create);

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send({result:"success" , msg : "로그아웃 완료..!"});
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        {
          id: user["userid"]
        },
        process.env.SECRET_KEY
      );
      res.status(200).send({
        message: "로그인에 성공하였습니다.",
        user: user,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  }
);

module.exports = router;