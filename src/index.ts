import "./scss/main.scss";
import axios, { AxiosResponse, AxiosError } from "../node_modules/axios/index";
import Service from "./ts/service";

let loginBtn: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("login-btn")
);

loginBtn.addEventListener("click", GetLogin);

function GetLogin() {
  event.preventDefault();

  let user: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("username-input")
  );
  let pass: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("password-input")
  );

  let userString: string = user.value;
  let passString: string = pass.value;

  let service = new Service();
  service.requestLogin(userString, passString);
}
