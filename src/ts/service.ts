import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";
import IUser from "../interfaces/IUser";
import IRecord from "../interfaces/IRecord";
import IRecordaverage from "../interfaces/IRecordaverage";
import HealthChart from "../charts/health-chart";
import SpChart from "../charts/pollution/sp-chart";
import DpChart from "../charts/pollution/dp-chart";

// Diverse URI from local web api and Azure webapi
const getlocalUriLogin: string = "http://localhost:50070/api/users/login/";
const postLocalUri: string = "http://localhost:50070/api/records/";
const postAzureUri: string =
  "https://berthapibeta20181025031131.azurewebsites.net/api/records/";
const getAzureUriLogin: string =
  "https://berthapibeta20181025031131.azurewebsites.net/api/users/login/";
const getAzureUriDateFilter: string =
  "https://berthapibeta20181025031131.azurewebsites.net/api/records/filterbydate/";
const getUriDateFilter: string =
  "http://localhost:50070/api/records/filterbydate/";

// Class that contained methods to connect with the API
export default class Service {
  constructor() {
    let service = axios.create({});
  }

  //Method for login
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

  // Method for posting indicators data
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
        alert("Your indicators has been saved. Enjoy life!");
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  // Method for requesting data filtered by date
  sendDatesToApi(userId: number, value1: number, value2: number) {
    event.preventDefault();

    let query: string = getAzureUriDateFilter.concat(
      userId + "/" + value1 + "/" + value2
    );

    // let query: string = getUriDateFilter.concat(
    //   userId + "/" + value1 + "/" + value2
    // );

    console.log("Esta es la query: " + query);

    axios
      .get<IRecordaverage[]>(query)
      .then(
        (response: AxiosResponse<IRecordaverage[]>): void => {
          console.log(response.data);

          let responseArray: IRecordaverage[] = response.data;

          console.log("responseArray: " + responseArray);

          // Health Chart Arrays
          let days: number[] = [];
          let bpSystolicArray: number[] = [];
          let bpDiastolicArray: number[] = [];
          let bodytemperatureArray: number[] = [];
          let heartBeatPerSecondArray: number[] = [];
          let carbonMonoxideArray: number[] = [];

          // Pollution Chart Arrays
          let pollutionIndicators: number[] = [];

          let dustArray: number[] = [];
          let sulphurArray: number[] = [];
          let nitrogenArray: number[] = [];
          let fluorArray: number[] = [];
          let carbonArray: number[] = [];
          let ozoneArray: number[] = [];

          // Weather Data Array
          let weatherData: number[] = [];
          console.log("Esta es la data del weather: " + weatherData);

          let tempArray: number[] = [];
          let pressArray: number[] = [];
          let humArray: number[] = [];

          responseArray.forEach(element => {
            let day = element.dayDate;
            console.log("Que pasa?" + day);

            // Health Data

            let bpSystolic = +element.bpSystolic.toFixed(2);
            let bpDiastolic = +element.bpDiastolic.toFixed(2);

            let bodyTemperature = +element.bodyTemperature.toFixed(2);
            let heartBeatPerSecond = +element.heartBeatPerSecond.toFixed(2);
            let carbonMonoxide = +element.carbonMonoxide.toFixed(2);

            // Pollution Data

            let dust = +element.dust.toFixed(2);
            console.log("Este es el valor DUST: " + dust);
            let sulphur = +element.sulphur.toFixed(2);
            let nitrogen = +element.nitrogen.toFixed(2);
            let fluor = +element.fluor.toFixed(2);
            let carbon = +element.carbonMonoxide.toFixed(2);
            let ozone = +element.ozone.toFixed(2);

            // Weather Data

            let temperature = +element.temperature.toFixed(2);
            let pressure = +element.pressure.toFixed(2);
            let humidity = +element.humidity.toFixed(2);

            // Pushing Health Chart

            days.push(day);
            bpSystolicArray.push(bpSystolic);
            bpDiastolicArray.push(bpDiastolic);
            bodytemperatureArray.push(bodyTemperature);
            heartBeatPerSecondArray.push(heartBeatPerSecond);
            carbonMonoxideArray.push(carbonMonoxide);

            // Pushing Pollution Chart
            dustArray.push(dust);
            sulphurArray.push(sulphur);
            nitrogenArray.push(nitrogen);
            fluorArray.push(fluor);
            carbonArray.push(carbon);
            ozoneArray.push(ozone);

            // Pushing weather data
            tempArray.push(temperature);
            pressArray.push(pressure);
            humArray.push(humidity);

            console.log("Esta es la weather data: " + weatherData);
          });

          console.log(days);
          console.log(bodytemperatureArray);
          console.log(heartBeatPerSecondArray);
          console.log(carbonMonoxideArray);

          let bpSysAvg = getAverage(bpSystolicArray);
          let bpDiasAvg = getAverage(bpDiastolicArray);

          console.log("Este es el valor del dustARRAY: " + dustArray);
          let dustAvg = getAverage(dustArray);
          console.log("Este es el dust average " + dustAvg);
          pollutionIndicators.push(dustAvg);
          let sulphurAvg = getAverage(sulphurArray);
          pollutionIndicators.push(sulphurAvg);
          let nitrogenAvg = getAverage(nitrogenArray);
          pollutionIndicators.push(nitrogenAvg);
          let fluorAvg = getAverage(fluorArray);
          pollutionIndicators.push(fluorAvg);
          let carbonAvg = getAverage(carbonArray);
          pollutionIndicators.push(carbonAvg);
          let ozoneAvg = getAverage(carbonArray);
          pollutionIndicators.push(ozoneAvg);

          console.log("Este es mi weatherARRAY: " + tempArray);
          let temperatureAvg = getAverage(tempArray) * 10;
          console.log("Este es el temperatureAvg: " + temperatureAvg);
          weatherData.push(temperatureAvg);
          let pressureAvg = getAverage(pressArray);
          weatherData.push(pressureAvg);
          let humidityAvg = getAverage(humArray) * 1000;
          weatherData.push(humidityAvg);

          console.log(
            "Estos son los pollution indicators: " + pollutionIndicators
          );
          console.log("Estos son los weather data: " + weatherData);

          let healthChart = new HealthChart();
          healthChart.getHealthChart(
            days,
            bodytemperatureArray,
            heartBeatPerSecondArray,
            carbonMonoxideArray
          );

          let dpChart = new DpChart();
          console.log(pollutionIndicators);
          dpChart.getPollutionChart(pollutionIndicators);

          let spChart = new SpChart();
          spChart.getWeatherChart(weatherData);

          document.getElementById(
            "systolic-value"
          ).innerHTML = bpSysAvg.toString();
          document.getElementById(
            "diastolic-value"
          ).innerHTML = bpDiasAvg.toString();
        }
      )
      .catch(function(error: AxiosError): void {
        console.log(JSON.stringify(error));
        alert("User not found");
      });
  }
}

// Method get the average of indicators
function getAverage(valueArray: number[]) {
  let sum: number = 0;

  for (var i = 0; i < valueArray.length; i++) {
    sum += valueArray[i];
    console.log("Esta es la sum: " + sum);
  }

  var avgNumber: number = sum / valueArray.length;
  var avg: number = +avgNumber.toFixed(1);

  return avg;
}
