import {Button, Card, Flex, List } from "antd";
import React from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Record from "./record.tsx"
import duration from 'dayjs/plugin/duration'


interface PlotCardProps {
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


const PlotCard: React.FC<PlotCardProps> = ({records})=> {
    function recordsToPoints(records: Record[]) {
        const minDateRecord = records.reduce((min, record) => {
          return record.datetime < min.datetime ? record : min;
        });

        let points: Point[] = []

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            points.push(new Point(-minDateRecord.datetime.diff(record.datetime, "minute"), record.value))
        }

        return points;

    }  


    return (
        <div style={fullFillStyle}>
            <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={recordsToPoints(records)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
        </div>
    )
}

export default PlotCard