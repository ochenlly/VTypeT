interface loginData {
  username: string;
  password: string;
}

interface registerData {
  username: string;
  password: string;
  confirmPassword: string;
}

export type { loginData, registerData };
