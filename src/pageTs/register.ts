import type { IRegister } from "../type";

class CRegister implements IRegister {
  account: string = "";
  password: string = "";
  confirmPassword: string = "";
}
export { CRegister };
