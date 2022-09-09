interface ILogin {
  username: string;
  password: string;
}
interface IRegister {
  username: string;
  password: string;
  confirmPassword: string;
}
interface IForm {
  name: string;
  region: string;
  date1: string;
  date2: string;
  delivery: boolean;
  type: Array<string>;
  resource: string;
  desc: string;
}
//table中的约束
interface User {
  date: string;
  name: string;
  address: string;
}
export type { ILogin, IRegister, IForm, User };
