import type { ILogin } from "../type";
//登录表单
class CLogin implements ILogin {
  username: string = "";
  password: string = "";
}

export { CLogin };
