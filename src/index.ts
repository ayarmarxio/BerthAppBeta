import "./scss/main.scss";
// import QueryFactory from "./queryfactory";
import axios, { AxiosResponse, AxiosError } from "../node_modules/axios/index";
import Service from "./service";

let loginBtn: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("login-btn")
);

loginBtn.addEventListener("click", TestAxios);

function TestAxios() {
  event.preventDefault();

  let user: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("username-input")
  );
  let pass: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("password-input")
  );

  let userString: string = user.toString();
  let passString: string = pass.toString();

  let service = new Service();

  service.getLogin(userString, passString);
}

// loginBtn.addEventListener("click", ExecuteLogin);

// loginBtn.addEventListener("click", Login);

// function ExecuteLogin() {
//   let queryFactory = new QueryFactory();
//   this.response = queryFactory.getTest();
//   console.log(this.response);
// }
