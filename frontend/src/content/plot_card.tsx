import { Button, Card, Flex, List, Space } from "antd";
import React from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx";
import Record from "./record.tsx";
import duration from "dayjs/plugin/duration";
import ApexChart from "./timechart.tsx";
import Model from "./model.tsx";
import dayjs from "dayjs";

interface PlotCardProps {
    model: Model;
    setModelIndex: (value: number) => void;
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

const PlotCard: React.FC<PlotCardProps> = ({
    model,
    setModelIndex,
    records,
}) => {
    function recordsToPoints() {
        if (records.length == 0) {
            return [];
        }
        let points: (string | number)[][] = [];

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            points.push([record.datetime.toISOString(), record.value]);
        }

        return points;
    }

    function setMoodModel() {
        setModelIndex(0);
    }

    function setAnxietyModel() {
        setModelIndex(1);
    }

    return (
        <Flex style={fullFillStyle} vertical>
            <Flex style={fullWidthStyle} align="center" justify="center">
                <Space.Compact block>
                    <Button
                        onClick={setMoodModel}
                        type={model.index == 0 ? "primary" : "default"}
                        style={fullWidthStyle}
                    >
                        Настроение
                    </Button>
                    <Button
                        onClick={setAnxietyModel}
                        type={model.index == 1 ? "primary" : "default"}
                        style={fullWidthStyle}
                    >
                        Тревожность
                    </Button>
                </Space.Compact>
            </Flex>

            <Flex style={fullFillStyle} align="center" justify="center">
                <ApexChart model={model} points={recordsToPoints()}></ApexChart>
            </Flex>
        </Flex>
    );
};

export default PlotCard;