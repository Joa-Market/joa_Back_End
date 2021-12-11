const { User, sequelize } = require("../models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const multer = require("multer"); //form data 처리를 할수 있는 라이브러리 multer
const multerS3 = require("multer-s3"); // aws s3에 파일을 처리 할수 있는 라이브러리 multer-s3
const AWS = require("aws-sdk"); //javascript 용 aws 서비스 사용 라이브러리
const path = require("path"); //경로지정
const fs = require("fs");
require("dotenv").config({ path: __dirname + "\\" + ".env" });
const { logger } = require("../config/logger"); //로그

async function emailCheck(email) {
    try {
        const isemail = await User.findOne({ where: { email: email } });
        if (isemail) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return true;
    }
}

async function nickNameCheck(nickname) {
    try {
        const isemail = await User.findOne({ where: { nickname: nickname } });
        if (isemail) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return true;
    }
}

checkemail = async (req, res) => {
    const { email } = req.body;
    if (await emailCheck(email)) {
        return res
            .status(200)
            .send({ result: "fail", msg: "이메일이 중복되었습니다.", data: false });
    } else {
        return res
            .status(200)
            .send({ result: "fail", msg: "이메일이 중복없음", data: true });
    }
};

checknickname = async (req, res) => {
    const { nickname } = req.body;
    if (await nickNameCheck(nickname)) {
        return res
            .status(200)
            .send({ result: "fail", msg: "닉네임이 중복되었습니다.", data: false });
    } else {
        return res
            .status(200)
            .send({ result: "fail", msg: "닉네임이 중복없음", data: true });
    }
};

//회원가입
signup = async (req, res) => {
    const { nickName, email, pw } = req.body;
    try {
        if (await emailCheck(email)) {
            return res
                .status(400)
                .send({ result: "fail", msg: "이메일이 중복되었습니다." });
        } else {
            const salt = Math.round(new Date().valueOf() * Math.random()) + "";
            const hashpw = crypto
                .createHash("sha512")
                .update(pw + salt)
                .digest("hex");
            const users = User.create({
                nickname:nickName,
                email: email,
                pw : hashpw,
                salt : salt
            })
            logger.info("POST /signup");
            return res.status(200).send({ result: "success", msg: "회원가입 완료." });
        }
    } catch (error) {
        logger.error(error);
        return res
            .status(400)
            .send({ result: "fail", msg: "DB 정보 조회 실패", error: error });
    }
};

module.exports = {
    signup: signup,
  };