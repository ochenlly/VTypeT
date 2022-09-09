import service from ".";
import type { loginData, registerData } from "./type";
export function loginModule(data: loginData) {
  return service({
    url: "/api/login",
    method: "post",
    data,
  });
}

export function registerModule(data: registerData) {
  return service({
    url: "/api/register",
    method: "post",
    data,
  });
}
