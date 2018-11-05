import axios, { AxiosResponse, AxiosError } from "../node_modules/axios/index";
// checking branch
const localUri: string = "http://localhost:50070/api/users";
const azureUri: string =
  "https://berthapibeta20181025031131.azurewebsites.net/api/users";

interface IUser {
  id: number;
  name: string;
  password: string;
}

export default class Service {
  constructor() {
    let service = axios.create({});
  }

  get() {
    event.preventDefault();

    axios
      .get<IUser[]>(localUri, {
        headers: {
          crossorigin: "true"
        }
      })
      .then(function(response: AxiosResponse<IUser[]>): void {
        let data: IUser[] = response.data;
        let stringData: string = JSON.stringify(data);
        console.log("Esta es mi data" + stringData);
      })
      .catch(function(error: AxiosError): void {
        console.log(JSON.stringify(error));
      });
  }

  async getLogin(username: string, password: string) {
    event.preventDefault();

    axios
      .get<IUser[]>(
        "https://berthapibeta20181025031131.azurewebsites.net/api/users",
        {
          params: {
            user: "user",
            pass: "password"
          }
        }
      )
      .then(function(response: AxiosResponse<IUser[]>): void {
        let data: IUser[] = response.data;
        let stringData: string = JSON.stringify(data);
        console.log("Esta es mi data" + stringData);
      })
      .catch(function(error: AxiosError): void {
        console.log(JSON.stringify(error));
      });
  }
}
