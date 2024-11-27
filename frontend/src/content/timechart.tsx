import React, { ReactElement } from 'react';
import ReactApexChart from 'react-apexcharts';
import Model from './model.tsx';
import { theme, Flex } from 'antd';
import { fullFillStyle } from './styles.tsx';

interface DateTimeChartProps {
    model: Model;
    points: (string | number)[][];
}

function DateTimeChart({ model, points }: DateTimeChartProps): ReactElement<DateTimeChartProps> {
    const {token} = theme.useToken();

    function options() {
        return {
            series: [{
                name: 'Настроение',
                data: points,
                color: token.colorPrimary
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
                              color: token.colorPrimary,
                              opacity: 0.5
                          },
                          {
                              offset: 100,
                              color: token.colorPrimary,
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
                            fontSize: '13px',
                            width: "50px",
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
        <ReactApexChart style={fullFillStyle} height="100%" width="100%" options={options().options} series={options().series} type="area" />

        // <Flex style={fullFillStyle} justify="center" align="center">
        //     <ReactApexChart height="100%" width="100%" options={options().options} series={options().series} type="area" />
        // </Flex>
    );
}

export default DateTimeChart;
