import { Flex, Card, ConfigProvider, Button, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { fullFillStyle } from "./styles.tsx"
import Record from "./record.tsx"
import RecordsList from "./records_list.tsx";
import PlotCard from "./plot_card.tsx";
import Model from "./model.tsx";
import models from "./models.tsx"
import { AuthContext } from "./authcontext.tsx";

const Workspace: React.FC = ()=> {
    const [records, setRecords] = useState<Record[]>([]);
    const [modelIndex, setModelIndex] = useState<number>(0);
    const [model, setModel] = useState<Model>(models[modelIndex]);
    const {user, login, logout} = React.useContext(AuthContext);


    function setMoodModel() {
        setModelIndex(0)
    }

    function setAnxietyModel() {
        setModelIndex(1)
    }

    useEffect (() => {
        setRecords([])
        setModel(models[modelIndex])
    }, [modelIndex])

    function logOut() {
        logout()
    }

    return (
        <ConfigProvider  theme={{
            token: {
              colorPrimary: model.primaryColor, // Ваш основной цвет
              colorText: '#333333',    // Цвет текста
            },
          }}>   
                <Flex style={fullFillStyle} justify="space-between" align="center">
                        <Space.Compact block>
                            <Button onClick={setMoodModel} type={modelIndex == 0 ? "primary" : "default"}>
                                Настроение
                            </Button>
                            <Button onClick={setAnxietyModel} type={modelIndex == 1 ? "primary" : "default"}>
                                Тревожность
                            </Button>
                        </Space.Compact>
                        <Flex align="center" justify="center" gap="small">
                            {user.name}
                            <Button onClick={logOut}>
                                Выход
                            </Button>
                        </Flex>
                </Flex>
                <Flex style={fullFillStyle} gap="middle">
                    <div style={{width: "30%"}}>
                        <RecordsList records={records} setRecords={setRecords} model={model}/>
                    </div>
                    <div style={{width: "70%"}}>
                        <PlotCard model={model} records={records}>
                            
                        </PlotCard>
                    </div>
                </Flex>
            

        </ConfigProvider>

    )
}

export default Workspace