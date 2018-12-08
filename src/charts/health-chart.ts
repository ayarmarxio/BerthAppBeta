import Echarts from "echarts";

export default class HealthChart {
  constructor() {}

  getHealthChart(
    axisArray: number[],
    bloodSeries: number[],
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
        text: "Health Evolution"
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
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
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
          name: "Blood Pressure",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: bloodSeries
        },
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
          areaStyle: {},
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
          areaStyle: { normal: {} },
          data: carbonSeries
        }
      ]
    };
    MyHealthChart.setOption(option);
  }
}
