import { Button, Card, Flex, List, Space } from "antd";
import React from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx";
import Record from "./record.tsx";
import duration from "dayjs/plugin/duration";
import ApexChart from "./timechart.tsx";
import Model from "./model.tsx";
import dayjs from "dayjs";
import { Context } from "./authcontext.tsx";


class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const PlotCard: React.FC = () => {
    const context = React.useContext(Context);

    function recordsToPoints() {
        if (context?.records?.length == 0) {
            return [];
        }
        let points: (string | number)[][] = [];

        const length = context?.records?.length;
        if (length === null || length === undefined)
            return []

        for (let i = 0; i < length; i++) {
            const record = context?.records[i];
            if (record !== null && record !== undefined)
                points.push([record.datetime.toISOString(), record.value]);
        }

        return points;
    }

    function setMoodModel() {
        context?.setModelIndex(0);
    }

    function setAnxietyModel() {
        context?.setModelIndex(1);
    }

    return (
        <Flex style={fullFillStyle} vertical>
            <Flex style={fullWidthStyle} align="center" justify="center">
                <Space.Compact block>
                    <Button
                        onClick={setMoodModel}
                        type={context?.model?.index == 0 ? "primary" : "default"}
                        style={fullWidthStyle}
                    >
                        Настроение
                    </Button>
                    <Button
                        onClick={setAnxietyModel}
                        type={context?.model.index == 1 ? "primary" : "default"}
                        style={fullWidthStyle}
                    >
                        Тревожность
                    </Button>
                </Space.Compact>
            </Flex>

            <Flex style={fullFillStyle} align="center" justify="center">
                <ApexChart points={recordsToPoints()}></ApexChart>
            </Flex>
        </Flex>
    );
};

export default PlotCard;