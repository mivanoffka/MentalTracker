import {Button, Card, Flex, List } from "antd";
import React from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Record from "./record.tsx"
import duration from 'dayjs/plugin/duration'
import ApexChart from "./timechart.tsx"
import Model from "./model.tsx"
import dayjs from "dayjs";


interface PlotCardProps {
  model: Model;
  records: Record[];
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
}

const PlotCard: React.FC<PlotCardProps> = ({model, records})=> {
    function recordsToPoints() {
        if (records.length == 0) {
            return []
        }
        let points: (string | number)[][] = [];

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            points.push([record.datetime.toISOString(), record.value])
        }

        return points
    }  


    return (
            <ApexChart model={model} points={recordsToPoints()}>

            </ApexChart>
    )
}

export default PlotCard