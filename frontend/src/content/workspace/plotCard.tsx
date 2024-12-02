import { Button, Flex, Skeleton, Space } from "antd";
import React from "react";
import { fullFillStyle, fullWidthStyle } from "../utility/styles.tsx";
import ApexChart from "./DateTimeChart.tsx";
import { Context } from "../Context.tsx";

function PlotCard() {
    const context = React.useContext(Context);

    function recordsToPoints() {
        if (context?.records?.length == 0) {
            return [];
        }
        let points: (string | number)[][] = [];

        const length = context?.records?.length;
        if (length === null || length === undefined) return [];

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

    const plot = (
        <Flex style={fullFillStyle} align="center" justify="center">
            <ApexChart points={recordsToPoints()}></ApexChart>
        </Flex>
    );

    const skeleton = (
        <Flex style={{ width: "100%", height: "100%" }}>
            <Skeleton.Button
                active
                block
                style={{ width: "100%", height: "100%", overflow: "auto" }}
            ></Skeleton.Button>
        </Flex>
    );

    return (
        <Flex style={fullFillStyle} vertical gap="middle">
            <Flex style={fullWidthStyle} align="center" justify="center">
                <Space.Compact block>
                    <Button
                        onClick={setMoodModel}
                        type={
                            context?.model?.index == 0 ? "primary" : "default"
                        }
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

            {context?.records !== null ? plot : skeleton}
        </Flex>
    );
}

export default PlotCard;
