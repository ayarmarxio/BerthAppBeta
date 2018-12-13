import "./scss/userview.scss";
import OpenLayerClass from "./ts/openlayers";
import Service from "./ts/service";

//
let userName: string = localStorage.getItem("userName");
console.log("Este es el usernam: " + userName);
document.getElementById("user-span").innerHTML = "Hi, " + userName;

let Olp = new OpenLayerClass();
Olp.getMap();

let submitBtn: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("btn-submit")
);
submitBtn.addEventListener("click", submitForm);

function submitForm() {
  event.preventDefault();

  let coordsInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("hidden-coords")
  );

  let bpInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("bp-input")
  );
  let btInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("bt-input")
  );
  let hbInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("hb-input")
  );
  let dpInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("dp-input")
  );
  let sdInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("sd-input")
  );
  let onInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("on-input")
  );
  let fInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("f-input")
  );
  let cmInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("cm-input")
  );
  let opInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("op-input")
  );

  let coordsValue = coordsInput.value;
  let bpValueString: string = bpInput.value;

  let systolicValue: number = getSystolic(bpValueString);
  let diastolicValue: number = getDiastolic(bpValueString);
  let longValue: number = getLongValue(coordsValue);
  let latValue: number = getLatValue(coordsValue);

  let btValueString: string = btInput.value;
  let btValue: number = +btValueString;
  let hbValueString: string = hbInput.value;
  let hbValue: number = +hbValueString;
  console.log("Este es el heartBeat per second: " + hbValue);
  let dpValueString: string = dpInput.value;
  let dpValue: number = +dpValueString;
  let sdValueString: string = sdInput.value;
  let sdValue: number = +sdValueString;
  let onValueString: string = onInput.value;
  let onValue: number = +onValueString;
  let fValueString: string = fInput.value;
  let fValue: number = +fValueString;
  let cmValueString: string = cmInput.value;
  let cmValue: number = +cmValueString;
  let opValueString: string = opInput.value;
  let opValue: number = +opValueString;

  let userIdValue: string = localStorage.getItem("userId");
  let userValue: number = +userIdValue;
  console.log("Este es el valor: " + userIdValue);

  let service = new Service();
  service.submitToApi(
    longValue,
    latValue,
    systolicValue,
    diastolicValue,
    btValue,
    hbValue,
    dpValue,
    sdValue,
    onValue,
    fValue,
    cmValue,
    opValue,
    userValue
  );
}

function getSystolic(bpValueString: string) {
  let BpSystolicSplit = bpValueString.split("/", 2);
  let BpSystolicString = BpSystolicSplit[0];
  let BpSystolic = +BpSystolicString;
  console.log("Este es el systolic: " + BpSystolic);
  return BpSystolic;
}

function getDiastolic(bpValueString: string) {
  let BpDiastolicSplit = bpValueString.split("/", 2);
  let BpDiastolicString = BpDiastolicSplit[1];
  let BpDiastolic = +BpDiastolicString;
  console.log("Este es la medida del diastolic: " + BpDiastolic);
  return BpDiastolic;
}

function getLongValue(coordsValue: string) {
  let longSplit = coordsValue.split(",", 2);
  let longValueString = longSplit[0];
  let longValue = +longValueString;
  console.log(longValue);
  return longValue;
}

function getLatValue(coordsValue: string) {
  let latSplit = coordsValue.split(",", 2);
  let latValueString = latSplit[1];
  let latValue = +latValueString;
  console.log(latValue);
  return latValue;
}

// DATEPICKER LOGIC

let datepickerfrom: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("datepickerfrom")
);

let datepickerto: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("datepickerto")
);

let findBtn: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("find-btn")
);
findBtn.addEventListener("click", sendDates);

function sendDates() {
  console.log("Este es el datepicker from: " + datepickerfrom);
  console.log("Este es el datepicker from: " + datepickerto);

  document.getElementById("pollutionview").removeAttribute("hidden");

  let value1D = datepickerfrom.value;
  let value2D = datepickerto.value;

  console.log(value1D);
  console.log(value2D);

  let value1Date: Date = new Date(value1D);
  let value2Date: Date = new Date(value2D);

  console.log(value1Date);
  console.log(value2Date);

  let value1: number = value1Date.getTime() / 1000;
  let value2: number = value2Date.getTime() / 1000;

  console.log("Value1: " + value1);
  console.log("Value2: " + value2);

  let userIdString: string = localStorage.getItem("userId");
  let userId: number = +userIdString;

  let service = new Service();
  service.sendDatesToApi(userId, value1, value2);
}
