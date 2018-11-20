import "./scss/userview.scss";
import HealthChart from "./charts/health-chart";
import DpChart from "./charts/pollution/dp-chart";
import SpChart from "./charts/pollution/sp-Chart";
import OpChart from "./charts/pollution/op-chart";
import OpenLayerClass from "./ts/openlayers";

let dpChart = new DpChart();
let spChart = new SpChart();
let healthChart = new HealthChart();
let opChart = new OpChart();

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
  console.log("Este es el valor de la coordenadas input: " + coordsValue);
  const date = new Date();
  console.log("Esta es la date limpia: " + date);
  const datelocal = new Date().toLocaleString();
  console.log("est es date local: " + datelocal);

  let bpValueString: string = bpInput.value;

  let systolicValue = getSystolic(bpValueString);
  let diastolicValue = getDiastolic(bpValueString);

  let btValue: number = btInput.valueAsNumber;
  let hbValue: number = hbInput.valueAsNumber;
  let dpValue: number = dpInput.valueAsNumber;
  let sdValue: number = sdInput.valueAsNumber;
  let onValue: number = onInput.valueAsNumber;
  let fValue: number = fInput.valueAsNumber;
  let cmValue: number = cmInput.valueAsNumber;
  let opValue: number = opInput.valueAsNumber;
}

function getSystolic(bpValueString: string) {
  let BpSystolic = bpValueString.slice(0, 3);
  console.log("Este es el systolic: " + BpSystolic);
  return BpSystolic;
}

function getDiastolic(bpValueString: string) {
  let diastolic = bpValueString.slice(4);
  console.log("Este es la medida del diastolic: " + diastolic);
  return diastolic;
}
