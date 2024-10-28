import { Flex, Card, ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { fullFillStyle } from "./styles.tsx"
import Record from "./record.tsx"
import RecordsList from "./records_list.tsx";
import PlotCard from "./plot_card.tsx";
import Model from "./model.tsx";

const Workspace: React.FC = ()=> {
    const [records, setRecords] = useState<Record[]>([]);
    const [uid, setUid] = useState<number>(0);

    const blue: string = "#1677ff";
    const red: string = "#f5222d";
    const green: string = "#52c41a"


    const model: Model = new Model(
        0,
        "Настроение", 0, 1000,
        [
            "Плохо",
            "Не очень",
            "Нейтрально",
            "Хорошо",
            "Прекрасно"
        ],
        [
            "src/assets/mood/sad.png",
            "src/assets/mood/upset.png",
            "src/assets/mood/neutral.png",
            "src/assets/mood/ok.png",
            "src/assets/mood/fine.png"
        ],
        // "#3078F6",
        green,
        '#CCDFFF'
    );

    return (
        <ConfigProvider  theme={{
            token: {
              colorPrimary: model.primaryColor, // Ваш основной цвет
              colorText: '#333333',    // Цвет текста
            },
          }}>
            <Card style={fullFillStyle} >
                <Flex gap="middle">
                    <div style={{width: "30%"}}>
                        <RecordsList records={records} setRecords={setRecords} model={model} uid={uid} setUid={setUid}/>
                    </div>
                    <div style={{width: "70%"}}>
                        <PlotCard model={model} records={records}>
                            
                        </PlotCard>
                    </div>
                </Flex>
            </Card>
        </ConfigProvider>

    )
}

export default Workspace