import {List, Button} from "antd";
import React from "react";
import Record from "./record.tsx";
import Model from "./model.tsx";
import axios from "axios";


interface RecordsListItemProps {
    record: Record;
    model: Model;
}

const RecordsListItem: React.FC<RecordsListItemProps> = ({record, model}: RecordsListItemProps)=> {
    return (
        <List.Item
         key={record.id} style={{alignItems: "center", display: "flex", width: "100%", height: "100%"}}>
            <div style={{alignItems: "center", display: "flex", gap: "10px"}}>
                <img height="30" width="30" src={model.getImageSource(record.value)} alt="status" />
                <b>{model.getLabel(record.value)}</b>
            </div>
            {record.datetime.format("HH:mm")}
        </List.Item>

        
    )
}

export default RecordsListItem