const SocketIO = require('socket.io');
const axios = require('axios');
var ios = require("express-socket.io-session");
const redisClient = require('./config/redis');
const { notice } = require("./models");



module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' },{cors: {
    origin: '*',
  }});
  app.set('io', io);

  const socketin = io.of('/userin');
  socketin.use(ios(sessionMiddleware, { autoSave:true }));
  socketin.on('connection', (socket) => {
    console.log("클라이언트 연결")
    const redis = redisClient;
    let userid;
    socket.on('join', (massage) => {
      console.log(massage);
      console.log(socket.handshake.session);
      if(socket.handshake.session.passport){
        userid = socket.handshake.session.passport.user
        redis.hset('users', userid, socket.id);
        redis.hget('users', userid, function(err, obj){
          if(err){
            console.log(err)
            test.to("message").emit("연결실패..!")
          }
          console.log(obj)
          notice.findAll({where: { userid: userid }}).then((data)=>{
            test.to(obj).emit("message", data );
          }).catch(
            test.to(obj).emit("message", "DB연결에러 문의")
          )
        })
      }else{
        test.to(socket.id).emit("message","로그인 안됬음..!");
      }
    });
  
    socket.on('sendMessage', (message) => {
      console.log("메세지 받앗어요.", socket.handshake.session);
    });
  
    socket.on('disconnect', () => {
      if(userid){
        redisClient.hdel("users", userid);
      }
      console.log("연결종료")
    })
  });

};