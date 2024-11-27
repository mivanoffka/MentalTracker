import { Flex } from "antd";
import React, { } from "react";
import "moment/locale/ru"
import AuthProvider from "./content/authcontext.tsx";
import TopBar from "./content/topbar.tsx";
import Workspace from "./content/workspace.tsx";

const App: React.FC = ()  => {
    return (
        <AuthProvider>

        </AuthProvider>
    )
}

export default App;
