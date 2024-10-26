import React, { ReactElement, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fullFillStyle } from './styles';
import Model from './model.tsx'

interface DateTimeChartProps {
    model: Model;
    points: (string | number)[][];
}

function DateTimeChart({model, points}: DateTimeChartProps): ReactElement<DateTimeChartProps> {
    function options() {
        return {
            series: [{
              name: 'Настроение',
              data: points
            }],
            options: {
              chart: {
                type: 'area',
                stacked: false,
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
              // title: {
              //   text: 'Динамика настроения',
              //   align: 'center',
              //   style: {
              //     fontSize: "24px"
              //   }
              // },
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
                  formatter: function (val: number) {
                    return model.getLabel(val)
                  },
                  align: "left",
                  style: {
                    fontSize: "14px",
                    
                }
                },
                min: model.minValue,
                max: model.maxValue,
                tickAmount: 4,

              },
              xaxis: {
                type: 'datetime',
              },
              tooltip: {
                shared: false,
                y: {
                  formatter: function (val: number) {
                    return model.getLabel(val)
                  }
                }
              }
            }
          }
    }

  return (

<>
            <ReactApexChart height="100%" options={options().options} series={options().series} type="area" />
        </>
  );
};

export default DateTimeChart;
