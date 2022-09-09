//导入express
const express = require("express");
//创建实例
const app = express();

// const Joi = require("joi");

//引入cors中间件
const cors = require("cors");
//解决跨域
app.use(cors());

//封装
app.use((req, res, next) => {
  //默认为错误情况
  res.sendMsg = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

const { expressjwt: jwt } = require("express-jwt");
const config = require("./config");
//解析token
app.use(
  jwt({
    secret: config.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({
    path: [/^\/api/],
  })
);

//引入用户模块路由
const userRouter = require("./router/user");
app.use("/api", userRouter);

//定义错误中间件
app.use((err, req, res, next) => {
  // if (err instanceof Joi.ValidationError) return res.sendMsg(err);
  //未知错误
  res.sendMsg(err);
});

//启动服务器
app.listen(5050, () => {
  console.log("app server is running at http://127.0.0.1:5050");
});
