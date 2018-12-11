import Echarts from "echarts";

export default class SpChart {
  constructor() {}

  getWeatherChart(valuesArray: number[]) {
    let SpChart: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("sp-chart")
    );

    let MySpChart = Echarts.init(SpChart);

    let option = {
      title: {
        text: "Weather",
        subtext: "Weather average during selected days"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        type: "category",
        data: ["Temperature", "Pressure", "Humidity"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: valuesArray,
          type: "bar"
        }
      ]
    };
    MySpChart.setOption(option);
  }
}
