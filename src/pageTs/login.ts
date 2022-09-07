import type { ILogin } from "../type";
//登录表单
class CLogin implements ILogin {
  account: string = "";
  password: string = "";
}

export { CLogin };
