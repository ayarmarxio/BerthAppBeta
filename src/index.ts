import "./scss/main.scss";
import Service from "./ts/service";

// Get the Button for login the application
let loginBtn: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("login-btn")
);
loginBtn.addEventListener("click", GetLogin);

// Sends to the service class the username value and the password value to acces the login
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
  // Method to request login access
  service.requestLogin(userString, passString);
}
