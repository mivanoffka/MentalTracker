import { Flex, Card } from "antd";
import React, { useState } from "react";
import { fullFillStyle } from "./styles.tsx"
import Record from "./record.tsx"
import RecordsList from "./records_list.tsx";
import PlotCard from "./plot_card.tsx";
import Model from "./model.tsx";

const Workspace: React.FC = ()=> {
    const [records, setRecords] = useState<Record[]>([]);


    const model: Model = new Model(
        "Настроение", 0, 600,
        [
            "Плохо",
            "Не очень",
            "Нейтрально",
            "Хорошо",
            "Прекрасно"
        ],
        [
            "https://em-content.zobj.net/source/microsoft-teams/363/disappointed-face_1f61e.png",
            "https://em-content.zobj.net/source/microsoft-teams/363/confused-face_1f615.png",
            "https://em-content.zobj.net/source/microsoft-teams/363/neutral-face_1f610.png",
            "https://em-content.zobj.net/source/microsoft-teams/363/slightly-smiling-face_1f642.png",
            "https://em-content.zobj.net/source/microsoft-teams/363/smiling-face-with-smiling-eyes_1f60a.png"
        ]
    );

    return (
        <Card style={fullFillStyle} >
            <Flex gap="middle">
                <div style={{width: "30%"}}>
                    <RecordsList records={records} setRecords={setRecords} model={model}/>
                </div>
                <div style={{width: "70%"}}>
                    
                </div>
            </Flex>
        </Card>

    )
}

export default Workspace