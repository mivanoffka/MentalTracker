import {Button, Card, Flex, List } from "antd";
import React from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx"


const RecordsList: React.FC = ()=> {
    return (
        <Card style={fullFillStyle}>
            <Flex vertical gap="middle" align="center" justify="center">
                <List>

                </List>
                <Button type="primary" style={fullWidthStyle}>Внести</Button>
            </Flex>
        </Card>
    )
}

export default RecordsList