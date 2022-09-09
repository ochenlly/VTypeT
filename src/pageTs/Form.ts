import { IForm } from "../type";
class CForm implements IForm {
  name: string = "";
  region: string = "";
  date1: string = "";
  date2: string = "";
  delivery: boolean = false;
  type: Array<string> = [];
  resource: string = "";
  desc: string = "";
}
export { CForm };
