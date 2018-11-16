import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";
import IUser from "../interfaces/IUser";
const localUri: string = "http://localhost:50070/api/users/login/";
const azureUri: string =
  "https://berthapibeta20181025031131.azurewebsites.net/api/users";

export default class Service {
  constructor() {
    let service = axios.create({});
  }

  requestLogin(username: string, password: string) {
    event.preventDefault();

    let query: string = localUri.concat(username + "/" + password);

    axios
      .get<IUser[]>(query, {
        params: {
          user: username,
          pass: password
        }
      })
      .then(function(response: AxiosResponse<IUser[]>): void {
        let data: IUser[] = response.data;

        let stringData: string = JSON.stringify(data);

        if (stringData != null) {
          window.location.href = "userview.html";
        }
      })
      .catch(function(error: AxiosError): void {
        console.log(JSON.stringify(error));
        alert("User not found");
      });
  }
}
