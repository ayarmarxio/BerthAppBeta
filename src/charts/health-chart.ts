import Echarts from "echarts";

export default class HealthChart {
  constructor() {
    this.getHealthChart();
  }

  getHealthChart() {
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
          data: ["2013", "2014", "2015", "2016", "2017", "2018", "2019"]
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
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "Body Temperature",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "Heart Beat",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
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
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    MyHealthChart.setOption(option);
  }
}
