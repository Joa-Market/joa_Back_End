const { app, sessionMiddleware } = require("./app");
const webSocket = require("./soket");
const port = process.env.EXPRESS_PORT;
const ports = process.env.EXPRESS_PORTS;
("use strict");
const http = require("http");

if(!port){
  const fs = require("fs");
 
  const https = require("https");

  const privateKey = fs.readFileSync("/etc/letsencrypt/live/lebania.shop/privkey.pem", "utf8");
  const certificate = fs.readFileSync("/etc/letsencrypt/live/lebania.shop/cert.pem", "utf8")
  const ca = fs.readFileSync("/etc/letsencrypt/live/lebania.shop/fullchain.pem", "utf8")

  const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca
  };

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  const test = httpServer.listen(port, () => {
    console.log(new Date().toLocaleString());
    console.log("HTTP Server running on port 80");
  });

  const server = httpsServer.listen(ports, ()=>{
      console.log((new Date()).toLocaleString());
      console.log(`HTTPS -- listening on port 443 ...`);
  })

  webSocket(server, app, sessionMiddleware);
}else{
  const httpServer = http.createServer(app);
  const test = httpServer.listen(port, () => {
    console.log(new Date().toLocaleString());
    console.log("127.0.0.1");
  });
  webSocket(test, app, sessionMiddleware);
}