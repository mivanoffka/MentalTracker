import { Flex } from "antd";
import React, { } from "react";
import "moment/locale/ru"
import ContextProvider from "./content/context.tsx";
import TopBar from "./content/workspace/topBar.tsx";
import Workspace from "./content/workspace/workspace.tsx";

const App: React.FC = ()  => {
    return (
        <ContextProvider>

        </ContextProvider>
    )
}

export default App;
