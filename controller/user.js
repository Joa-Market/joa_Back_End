const { user, sequelize, address } = require("../models");
const crypto = require("crypto");
const multer = require("multer"); //form data 처리를 할수 있는 라이브러리 multer
const multerS3 = require("multer-s3"); // aws s3에 파일을 처리 할수 있는 라이브러리 multer-s3
const path = require("path"); //경로지정
const fs = require("fs");
const { logger } = require("../config/logger"); //로그

async function emailCheck(email) {
    try {
        const isemail = await user.findOne({ where: { email: email } });
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
        const isemail = await user.findOne({ where: { nickname: nickname } });
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
            logger.error("POST /signup 이메일 중복");
            return res
                .status(400)
                .send({ result: "fail", msg: "이메일이 중복되었습니다." });
        } else {
            const salt = Math.round(new Date().valueOf() * Math.random()) + "";
            const hashpw = crypto
                .createHash("sha512")
                .update(pw + salt)
                .digest("hex");
            const users = user.create({
                nickname: nickName,
                email: email,
                pw: hashpw,
                salt: salt
            })
            logger.info("POST /signup");
            return res.status(200).send({ result: "success", msg: "회원가입 완료." });
        }
    } catch (error) {
        logger.error("POST /signup"+error);
        return res.status(400)
            .send({ result: "fail", msg: "DB 정보 조회 실패", error: error });
    }
};

addaddress = async (req, res) => {
    const { x, y } = req.body;
    const user = res.locals.user;
    try {
        const addresses = address.create({
            address_name: "test",
            road_address_name: "test",
            x: x,
            y: y,
            userid: user.id,
        })
        logger.info("POST /adress");
        return res.status(200).send({ result: "success", msg: "주소 설정완료..!" });
    } catch (error) {
        logger.error("POST /adress"+error);
        return res.status(400).send({ result: "fail", msg: "주소 설정실패 확인요망!" });
    }

}

getmyuser = async (req, res) =>{
    const user = res.locals.user;
    if(!user){
        logger.error("GET /user 유저없음");
        return res.status(400).send({ result: "fail", msg: "해당 유저 없음" });
    }else{
        logger.info("GET /user");
        return res.status(200).send({ result: "success", msg: "불러오기 성공", user });
    }
}
module.exports = {
    signup: signup,
    addaddress: addaddress,
    getmyuser: getmyuser,
};