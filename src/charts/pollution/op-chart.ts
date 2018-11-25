import Echarts from "echarts";

export default class OpChart {
  constructor() {
    this.getOpChart();
  }

  getOpChart() {
    let OpChart: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("op-chart")
    );

    let MyOpChart = Echarts.init(OpChart, "light");

    let option = {
      title: { text: "Oxigen Data" },
      tooltip: {},
      legend: { data: ["Sales"] },
      xAxis: {
        data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
      },
      yAxis: {},
      itemStyle: {
        color: "#fa7040"
      },
      series: [
        {
          type: "bar",

          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    MyOpChart.setOption(option);
  }
}
