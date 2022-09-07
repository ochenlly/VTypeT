interface ILogin {
  account: string;
  password: string;
}
interface IRegister {
  account: string;
  password: string;
  confirmPassword: string;
}
export type { ILogin, IRegister };
