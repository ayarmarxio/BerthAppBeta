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
