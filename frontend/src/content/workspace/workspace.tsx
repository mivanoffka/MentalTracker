import { Flex, ConfigProvider } from "antd";
import React from "react";
import { fullFillStyle } from "../utility/styles.tsx";
import RecordsList from "./RecordsList.tsx";
import PlotCard from "./PlotCard.tsx";
import { Context } from "../Context.tsx";
import TopBar from "./TopBar.tsx";

function Workspace() {
    const context = React.useContext(Context);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: context?.model?.primaryColor,
                    colorText: "#333333",
                },
            }}
        >
            <Flex
                style={{ width: "100%", height: "100%" }}
                vertical
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
                    style={{ width: "100%", height: "100%" }}
                    gap="middle"
                    align="center"
                    justify="center"
                >
                    <Flex
                        style={{
                            width: "100%",
                            height: "100%",
                            overflow: "auto",
                        }}
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
                                    <RecordsList />
                                </div>
                                <div style={{ width: "70%" }}>
                                    <PlotCard />
                                </div>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </ConfigProvider>
    );
}

export default Workspace;
