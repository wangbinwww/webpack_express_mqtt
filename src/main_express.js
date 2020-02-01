var express = require("express");
var app = express();
var port = 3000;
app.get("/", function (req, res) {
  var responseObject = {
    name: "hello word",
    password: "123455678"
  };
  res.json(responseObject);
});
app.listen(port);
console.log("服务器入口:http://localhost:" + port);