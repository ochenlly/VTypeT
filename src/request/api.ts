import service from ".";
import type { loginData } from "./type";
export function login(data: loginData) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}
