import { workDataList } from "../constData";
import * as echarts from "echarts";

const initDataFun = () => {
  type EChartsOption = echarts.EChartsOption;
  var chartDom = document.getElementById("calendar")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  const dateList = workDataList;

  let heatmapData = [];
  let lunarData = [];
  for (let i = 0; i < dateList.length; i++) {
    heatmapData.push([dateList[i][0], Math.random() * 300]);
    lunarData.push([dateList[i][0], 1, dateList[i][1], dateList[i][2]]);
  }

  option = {
    tooltip: {
      formatter: function (params: any) {
        return "降雨量: " + params.value[1].toFixed(2);
      },
    },

    visualMap: {
      show: false,
      min: 0,
      max: 300,
      calculable: true,
      seriesIndex: [2],
      orient: "horizontal",
      left: "center",
      bottom: 20,
      inRange: {
        color: ["#e0ffff", "#006edd"],
        opacity: 0.3,
      },
      controller: {
        inRange: {
          opacity: 0.5,
        },
      },
    },

    calendar: [
      {
        left: "center",
        top: "middle",
        cellSize: [70, 70],
        yearLabel: { show: false },
        orient: "vertical",
        dayLabel: {
          firstDay: 1,
          nameMap: "cn",
        },
        monthLabel: {
          show: false,
        },
        range: "2017-03",
      },
    ],

    series: [
      {
        type: "scatter",
        coordinateSystem: "calendar",
        symbolSize: 1,
        label: {
          show: true,
          formatter: function (params: any) {
            var d = echarts.number.parseDate(params.value[0]);
            return d.getDate() + "\n\n" + params.value[2] + "\n\n";
          },
          color: "#000",
        },
        data: lunarData,
      },
      {
        type: "scatter",
        coordinateSystem: "calendar",
        symbolSize: 1,
        label: {
          show: true,
          formatter: function (params: any) {
            return "\n\n\n" + (params.value[3] || "");
          },
          fontSize: 14,
          fontWeight: 700,
          color: "#a00",
        },
        data: lunarData,
      },
      {
        name: "降雨量",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: heatmapData,
      },
    ],
  };
  option && myChart.setOption(option);
};

const initPicFunc = () => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById("histogram")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  option && myChart.setOption(option);
};
const initLinePicFunc = () => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById("line-chart")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  const data: number[][] = [];

  for (let i = 0; i <= 360; i++) {
    let t = (i / 180) * Math.PI;
    let r = Math.sin(2 * t) * Math.cos(2 * t);
    data.push([r, i]);
  }

  option = {
    title: {
      text: "Two Value-Axes in Polar",
    },
    legend: {
      data: ["line"],
    },
    polar: {
      center: ["50%", "54%"],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    angleAxis: {
      type: "value",
      startAngle: 0,
    },
    radiusAxis: {
      min: 0,
    },
    series: [
      {
        coordinateSystem: "polar",
        name: "line",
        type: "line",
        showSymbol: false,
        data: data,
      },
    ],
    animationDuration: 2000,
  };

  option && myChart.setOption(option);
};
export { initDataFun, initPicFunc, initLinePicFunc };
