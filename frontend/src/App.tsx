import React from "react";
import "moment/locale/ru";
import ContextProvider from "./content/Context.tsx";

const App: React.FC = () => {
    return <ContextProvider></ContextProvider>;
};

export default App;
