import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fullFillStyle } from './styles';

const ApexChart = () => {
  // Пример данных с временными метками и значениями
  const dates = [
    ['2023-10-01T00:00:00', 4500000],
    ['2023-10-02T00:00:00', 4600000],
    ['2023-10-03T00:00:00', 4700000],
    ['2023-10-04T00:00:00', 4800000],
    ['2023-10-05T00:00:00', 4900000],
  ];

  // Используем useState для хранения состояния
  const [chartOptions] = useState({
    series: [{
      name: 'XYZ MOTORS',
      data: dates
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: 'Price'
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          }
        }
      }
    }
  });

  return (
        <ReactApexChart style={fullFillStyle}
        options={chartOptions.options} series={chartOptions.series} type="area" height={350} />
  );
};

export default ApexChart;
