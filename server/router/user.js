const express = require("express");
//创建路由对象
const router = express.Router();

//引入数据验证中间件、
// const expressJoi = require("@escook/express-joi");

//创建json解析
const jsonParser = express.json();

// 引入登录处理函数
const user_handler = require("../router_handler/user");

//引入登录验证规则
// const { reg_login_schema } = require("../schema/user");

//登录
router.post("/login", jsonParser, user_handler.login);

//注册
router.post("/register", jsonParser, user_handler.register);

module.exports = router;
