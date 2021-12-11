const { User, sequelize, address, salepost } = require("../models");
const { logger } = require("../config/logger"); //로그

postsalepost = async (req, res) => {
    const { title ,tag, productName, price, contents, productImg } = req.body;
    const user = res.locals.user;
    try {
        const post = salepost.create({
            title: title,
            tag: tag,
            productName: productName,
            price: price,
            contents: contents,
            userid: user.id,
        })
        logger.info("POST /adress");
        return res.status(200).send({ result: "success", msg: "글이 성공적으로 작성되었습니다." });
    } catch (error) {
        logger.error("POST /adress"+error);
        return res.status(200).send({ result: "fail", msg: "작성실패" });
    }
}

module.exports = {
    postsalepost: postsalepost,
};