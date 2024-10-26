import { Flex } from "antd";
import React, { } from "react";
import "moment/locale/ru"
import Workspace from "./content/workspace.tsx";

const App: React.FC = ()  => {
    return (
        <Flex style={{width: "100%", height: "100%",}} vertical gap="middle" align="center" justify="center">
            <Flex style={{width: "100%", height: "100%"}} gap="middle" align="center" justify="center">
                <Flex style={{width: "1100px", height: "600px"}} vertical gap="middle" align="center" justify="center">
                    <Workspace>

                    </Workspace>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default App;
