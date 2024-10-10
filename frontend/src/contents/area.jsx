import {Card, Flex} from "antd";
import Dashboard from "./dashboard.jsx";
import React from "react";

function Area({model}) {
    return (
        <Flex horizontal gap="middle" align="center" justify="center">
            <Dashboard model={model}>

            </Dashboard>
            <Card style={{height: "450px", width: "600px"}}>

            </Card>
        </Flex>
    )
}

export default Area;