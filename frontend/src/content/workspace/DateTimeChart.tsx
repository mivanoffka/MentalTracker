import React from "react";
import ReactApexChart from "react-apexcharts";
import { theme } from "antd";
import { fullFillStyle } from "../utility/styles.tsx";
import { Context } from "../Context.tsx";

interface DateTimeChartProps {
    points: (string | number)[][];
}

function DateTimeChart({ points }: DateTimeChartProps) {
    const { token } = theme.useToken();
    const context = React.useContext(Context);

    function options() {
        return {
            series: [
                {
                    name: "Настроение",
                    data: points,
                    color: token.colorPrimary,
                },
            ],
            options: {
                chart: {
                    type: "area",
                    stacked: false,
                    zoom: {
                        type: "x",
                        enabled: true,
                        autoScaleYaxis: true,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    type: "gradient",
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
                                opacity: 0.5,
                            },
                            {
                                offset: 100,
                                color: token.colorPrimary,
                                opacity: 0,
                            },
                        ],
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val: number) {
                            return context?.model.getLabel(val);
                        },
                        style: {
                            fontSize: "13px",
                            width: "50px",
                        },
                    },
                    min: context?.model.minValue,
                    max: context?.model.maxValue,
                    tickAmount: 4,
                },
                xaxis: {
                    type: "datetime",
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val: number) {
                            return context?.model.getLabel(val);
                        },
                    },
                },
            },
        };
    }

    return (
        <ReactApexChart
            style={fullFillStyle}
            height="100%"
            width="100%"
            options={options().options}
            series={options().series}
            type="area"
        />

        // <Flex style={fullFillStyle} justify="center" align="center">
        //     <ReactApexChart height="100%" width="100%" options={options().options} series={options().series} type="area" />
        // </Flex>
    );
}

export default DateTimeChart;
