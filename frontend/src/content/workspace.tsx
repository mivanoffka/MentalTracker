import { Flex, Card, ConfigProvider, Button, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { fullFillStyle } from "./styles.tsx";
import Record from "./record.tsx";
import RecordsList from "./records_list.tsx";
import PlotCard from "./plot_card.tsx";
import Model from "./model.tsx";
import models from "./models.tsx";
import { Context } from "./authcontext.tsx";
import TopBar from "./topbar.tsx";

const Workspace: React.FC = () => {
    const context = React.useContext(Context);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: context?.model?.primaryColor, // Ваш основной цвет
                    colorText: "#333333", // Цвет текста
                },
            }}
        >
            <Flex
                style={{ width: "100%", height: "100%" }}
                vertical
                // gap="middle"
                // align="center"
                // justify="center"
            >
                <Flex
                    style={{
                        width: "100%",
                        height: "60px",
                        boxShadow: "10px -10px 20px rgba(0, 0, 0, 0.5)",
                    }}
                    gap="middle"
                    align="center"
                    justify="center"
                >
                    <TopBar></TopBar>
                </Flex>
                <Flex
                    style={{ width: "100%", height: "100%"}}
                    gap="middle"
                    align="center"
                    justify="center"
                >
                    <Flex
                        style={{ width: "100%", height: "100%", overflow: "auto" }}
                        align="center"
                        justify="center"
                        vertical
                    >
                        <Flex
                            style={{ width: "1100px", height: "550px" }}
                            vertical
                            gap="middle"
                            align="center"
                            justify="center"
                        >
                            <Flex style={fullFillStyle} gap="middle">
                                <div style={{ width: "30%" }}>
                                    <RecordsList
                                        records={context?.records ?? []}
                                        setRecords={context?.setRecords}
                                        model={context?.model ?? models[0]}
                                    />
                                </div>
                                <div style={{ width: "70%" }}>
                                    <PlotCard
                                        model={context?.model ?? models[0]}
                                        setModelIndex={context?.setModelIndex}
                                        records={context?.records ?? []}
                                    ></PlotCard>
                                </div>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </ConfigProvider>
    );
};

export default Workspace;
