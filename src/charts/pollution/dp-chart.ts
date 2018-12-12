import Echarts from "echarts";

export default class DpChart {
  constructor() {}

  getPollutionChart(valuesArray: number[]) {
    console.log(valuesArray);
    let Chart: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("dp-chart")
    );

    let MyChart = Echarts.init(Chart);

    let option = {
      title: {
        text: "Pollution",
        subtext: "Average during selected days",
        textStyle: {
          fontFamily: "Jura",
          fontSize: "18",
          fontStyle: "normal",
          fontWeight: "bold"
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
      legend: {
        data: ["2011年"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 1]
      },
      yAxis: {
        type: "category",
        data: ["Dust", "Sulphur", "Nitrogen", "Fluor", "CO2", "Ozone"],
        textStyle: {
          fontFamily: "Jura",
          fontSize: "3"
        }
      },
      series: [
        {
          name: "Average",
          type: "bar",
          data: valuesArray,
          itemStyle: {
            color: "#fa7040",
            textStyle: {
              fontFamily: "Jura",
              fontSize: "3"
            }
          }
        }
      ]
    };
    MyChart.setOption(option);
  }
}
