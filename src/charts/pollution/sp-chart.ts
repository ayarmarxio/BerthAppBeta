import Echarts from "echarts";

export default class SpChart {
  constructor() {}

  getWeatherChart(valuesArray: number[]) {
    let SpChart: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("sp-chart")
    );

    let MySpChart = Echarts.init(SpChart);

    let option = {
      backgroundColor: "#fdffff",
      title: {
        text: "Weather",
        subtext: "Average during selected days",
        textStyle: {
          fontFamily: "Jura",
          fontSize: "18",
          fontStyle: "normal",
          fontWeight: "bold",
          color: "#445351"
        },
        subtextStyle: {
          fontSize: "11"
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        type: "category",
        data: ["Temp", "Press", "Humid"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: valuesArray,
          type: "bar",
          itemStyle: {
            color: "#fa7040",
            textStyle: {
              fontFamily: "Jura",
              fontSize: "5"
            }
          }
        }
      ]
    };
    MySpChart.setOption(option);
  }
}
