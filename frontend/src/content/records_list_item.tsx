import {List, Button, Flex} from "antd";
import React from "react";
import Record from "./record.tsx";
import Model from "./model.tsx";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { editButtonStyle} from "./styles.tsx";
import Confirmator from "./confirmator.tsx"

interface RecordsListItemProps {
    record: Record;
    model: Model;
    deleteRecord: (record: Record) => void;
    openEditor: (record: Record) => void;
}

const RecordsListItem: React.FC<RecordsListItemProps> = ({record, model, deleteRecord, openEditor}: RecordsListItemProps)=> {
    function date() {
        let datetext = "";

        if (record.datetime.day() == dayjs().day()) {
            datetext += "Сегодня"
        }
        else {
            datetext += record.datetime.format("MMMM D")
        }
        if (record.datetime.year() != dayjs().year()) {
            datetext += record.datetime.format(" YYYY")
        }
        datetext += ", "
        datetext += record.datetime.format("HH:mm")
        return datetext
    }

    function deleteSelectedRecord() {
        deleteRecord(record)
    }

    function editSelectedRecord() {
        openEditor(record)
    }

    function opedConfirmator() {
        setOpened(true);
    }

    const [opened, setOpened] = React.useState<boolean>(false);
 
    return (
            <List.Item
                key={record.id}
                style={{alignItems: "center", display: "flex", width: "100%", height: "100%", justifyContent: "space-between"}}>
                <div style={{alignItems: "center", display: "flex", gap: "10px", width: "100%"}}>
                    <img height="40" width="40" src={model.getImageSource(record.value)} alt="status" />
                    <Flex vertical style={{width: "140px"}} >
                        <b>{model.getLabel(record.value)}</b>
                        <div style={{fontSize: "10px"}}>{date()}</div>
                    </Flex>
                </div>
                <Flex>
                    <Button style={editButtonStyle} onClick={editSelectedRecord}>
                        <EditOutlined></EditOutlined>
                    </Button>
                    <Button style={editButtonStyle} onClick={opedConfirmator}>
                        <DeleteOutlined color="red"></DeleteOutlined>
                    </Button>
                </Flex>

                <Confirmator opened={opened} setOpened={setOpened} 
                             prompt = "Удалить эту запись?"
                             onYes={deleteSelectedRecord} onNo={null}>

                </Confirmator>

            </List.Item>        
    )
}

export default RecordsListItem