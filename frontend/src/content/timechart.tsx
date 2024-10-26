import React, { ReactElement } from 'react';
import ReactApexChart from 'react-apexcharts';
import Model from './model.tsx';

interface DateTimeChartProps {
    model: Model;
    points: (string | number)[][];
}

function DateTimeChart({ model, points }: DateTimeChartProps): ReactElement<DateTimeChartProps> {
    function options() {
        return {
            series: [{
                name: 'Настроение',
                data: points,
                color: model.primaryColor
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
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100],
                        colorStops: [
                          {
                              offset: 0,
                              color: model.primaryColor,
                              opacity: 0.5
                          },
                          {
                              offset: 100,
                              color: model.primaryColor,
                              opacity: 0
                          }
                      ]
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function (val: number) {
                            return model.getLabel(val);
                        },
                        style: {
                            fontSize: '14px',
                        }
                    },
                    min: model.minValue,
                    max: model.maxValue,
                    tickAmount: 4
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val: number) {
                            return model.getLabel(val);
                        }
                    }
                },
            }
        };
    }

    return (
        <>
            <ReactApexChart height="100%" options={options().options} series={options().series} type="area" />
        </>
    );
}

export default DateTimeChart;
