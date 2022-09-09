//导入数据库操作模块
const db = require("../db");

const bcrypt = require("bcrypt");

const config = require("../config");

const jwt = require("jsonwebtoken");

//登录
exports.login = (req, res) => {
  if (JSON.stringify(req.body) == "{}")
    return res.status(500).json({ success: false, error: "Sorry, error" });

  const userinfo = req.body;

  const sql = "select * from users where username = ?";

  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.sendMsg(err);

    if (results.length !== 1) return res.sendMsg("账号无效！");

    const compareReult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );

    if (!compareReult) return res.sendMsg("密码错误！");

    //生成token的字符串
    const user = { ...results[0], password: "" };

    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });

    res.send({
      status: 0,
      message: "登录成功！",
      token: "Bearer " + tokenStr,
    });
  });
};

//注册
exports.register = (req, res) => {
  if (JSON.stringify(req.body) == "{}")
    return res.status(500).json({ success: false, error: "Sorry, error" });

  const userinfo = req.body;

  //检查账号
  if (userinfo.username.length < 3 || userinfo.username.length > 10)
    return res.sendMsg("账号的长度在3-10");

  const patternU = /^[0-9a-zA-Z]{3,10}$/;

  if (!patternU.test(userinfo.username))
    return res.sendMsg("账号只能是数字或者英文");

  //检查密码
  if (userinfo.password.length < 6 || userinfo.username.length > 15)
    return res.sendMsg("密码的长度在6-15");

  const patternP = /^[0-9a-zA-Z]{6,15}$/;

  if (!patternP.test(userinfo.password))
    return res.sendMsg("密码只能是数字或者英文");

  //检查重复密码
  if (userinfo.password !== userinfo.confirmPassword)
    return res.sendMsg("两次密码不一致！");

  const sql = "select * from users where username = ?";

  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.sendMsg(err);

    if (results.length > 0) return res.sendMsg("用户名已被占用");

    //加密处理
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    const sql = "insert  into users set ?";

    db.query(
      sql,
      [{ username: userinfo.username, password: userinfo.password }],
      (err, results) => {
        if (err) return res.sendMsg(err);

        if (results.affectedRows !== 1)
          return res.sendMsg("注册失败，请稍后再试！");

        res.sendMsg("注册成功！", 0);
      }
    );
  });
};
