import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";
import IUser from "../interfaces/IUser";
import IRecord from "../interfaces/IRecord";
const getlocalUriLogin: string = "http://localhost:50070/api/users/login/";
const postLocalUri: string = "http://localhost:50070/api/records/";
const postAzureUri: string =
  "https://berthapibeta20181025031131.azurewebsites.net/api/records/";
const getAzureUriLogin: string =
  "https://berthapibeta20181025031131.azurewebsites.net/api/users/login/";
const getAzureUriDateFilter: string = "";

export default class Service {
  constructor() {
    let service = axios.create({});
  }

  requestLogin(username: string, password: string) {
    event.preventDefault();

    let query: string = getAzureUriLogin.concat(username + "/" + password);
    console.log("Esta es la query: " + query);

    axios
      .get<IUser>(query)
      .then(
        (response: AxiosResponse<IUser>): void => {
          console.log(response.data);
          console.log(response.data.userId);
          console.log(response.data.username);
          let userId: number = response.data.userId;
          let userIdString: string = userId.toString();
          let userName: string = response.data.username;
          let userNameString: string = userName.toString();
          console.log("Este es el username string: " + userNameString);
          localStorage.setItem("userId", userIdString);
          localStorage.setItem("userName", userNameString);
          window.location.href = "userview.html";
        }
      )
      .catch(function(error: AxiosError): void {
        console.log(JSON.stringify(error));
        alert("User not found");
      });
  }

  submitToApi(
    Long: number,
    Lat: number,
    BpSystolic: number,
    BpDiastolic: number,
    BodyTemperature: number,
    HeartBeat: number,
    Dust: number,
    Sulphur: number,
    Nitrogen: number,
    Fluor: number,
    CarbonMonoxide: number,
    Ozone: number,
    UserId: number
  ) {
    event.preventDefault();
    let query: string = postAzureUri;
    console.log(query);
    console.log("Este es el heartbeat" + HeartBeat);

    axios
      .post<IRecord>(query, {
        long: Long,
        lat: Lat,
        bpSystolic: BpSystolic,
        bpDiastolic: BpDiastolic,
        bodytemperature: BodyTemperature,
        heartBeatPerSecond: HeartBeat,
        dust: Dust,
        sulphur: Sulphur,
        nitrogen: Nitrogen,
        fluor: Fluor,
        carbonMonoxide: CarbonMonoxide,
        ozone: Ozone,
        userId: UserId
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  sendDatesToApi(userId: number, value1: number, value2: number) {
    event.preventDefault();
    let query: string = getAzureUriDateFilter.concat(
      userId + "/" + value1 + "/" + value2
    );
    console.log("Esta es la query: " + query);
  }
}
