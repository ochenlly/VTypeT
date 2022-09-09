import type { IRegister } from "../type";

class CRegister implements IRegister {
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
}
export { CRegister };
