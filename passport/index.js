const passport = require("passport");
const local = require("./local");
const kakao = require("./forkakao");
const {
  users,
  sequelize
} = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userid);
  });

  passport.deserializeUser((id, done) => {
    users.findOne({
      where: { userid : id }
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
  kakao();
};