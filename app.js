const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const passprot = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const redis = require('redis');
// const redisClinet = require("./config/redis");
// const redisStore = require("connect-redis")(session);
const Router = require("./router");
const app = express();
const passportConfig = require('./passport');

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    secure: true,
    httpOnly: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "none",
      secure: true
    },
    // store: new redisStore({
    //     client: redisClinet
    // })
})

app.use(sessionMiddleware);

// const whitelist = [process.env.MYROCAL]
const corsOptions = {
    // origin: function (origin, callback) {
    //   if (whitelist.indexOf(origin) !== -1|| !origin) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("아.. 좀 비켜봐 넌 안되 나가."));
    //   }
    // },
    origin : true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.SECRET_KEY));
passportConfig(passprot);
app.use(passprot.initialize());
app.use(passprot.session());

app.use("/api",[Router]);

app.use((req, res, next)=>{
    const error =  new Error(`${req.method} ${req.url} 라우터 없음..!`);
    error.status = 404;
    next(error)
})
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.static || 500);
    res.send("error");
});

module.exports = {app , sessionMiddleware};