import { Flex } from "antd";
import React, { } from "react";
import "moment/locale/ru"
import ContextProvider from "./content/Context.tsx";
import TopBar from "./content/workspace/TopBar.tsx";
import Workspace from "./content/workspace/Workspace.tsx";

const App: React.FC = ()  => {
    return (
        <ContextProvider>

        </ContextProvider>
    )
}

export default App;
