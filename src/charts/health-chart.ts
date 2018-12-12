import Echarts from "echarts";

export default class HealthChart {
  constructor() {}

  getHealthChart(
    axisArray: number[],
    bodyseries: number[],
    heartseries: number[],
    carbonSeries: number[]
  ) {
    let HealthChart: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("health-chart")
    );

    let MyHealthChart = Echarts.init(HealthChart);

    console.log("Este es mi segundo Mychart" + MyHealthChart);

    let option = {
      title: {
        text: "Health Evolution",
        subtext: "Indicators compared to CO2",
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
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: axisArray
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "Body Temperature",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: bodyseries
        },
        {
          name: "Heart Beat",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {
              color: "#fa7040"
            }
          },
          data: heartseries
        },
        {
          name: "Carbon Monoxide",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          areaStyle: {
            normal: {
              color: "#445351"
            }
          },
          data: carbonSeries
        }
      ]
    };
    MyHealthChart.setOption(option);
  }
}
