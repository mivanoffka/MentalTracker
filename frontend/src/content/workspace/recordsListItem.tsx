import {List, Button, Flex} from "antd";
import React from "react";
import Record from "../types/record.tsx";
import Model from "../types/model.tsx";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { editButtonStyle, textButtonStyle} from "../utility/styles.tsx";
import Confirmator from "../utility/confirmator.tsx";
import { theme } from 'antd';
import { Context } from "../context.tsx";

interface RecordsListItemProps {
    record: Record;
    deleteRecord: (record: Record) => void;
    openEditor: (record: Record) => void;
}

const RecordsListItem: React.FC<RecordsListItemProps> = ({record, deleteRecord, openEditor}: RecordsListItemProps)=> {
    const context =  React.useContext(Context);

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
    const {token} = theme.useToken();
 
    return (
            <List.Item
                key={record.id}
                style={{alignItems: "center", display: "flex", width: "100%", height: "100%", justifyContent: "space-between"}}>
                <div style={{alignItems: "center", display: "flex", gap: "10px", width: "100%"}}>
                    <img height="40" width="40" src={context?.model.getImageSource(record.value)} alt="status" />
                    <Flex vertical style={{width: "140px"}} >
                        <b style={{fontSize: "14px"}}>{context?.model.getLabel(record.value)}</b>
                        <div style={{fontSize: "10px"}}>{date()}</div>
                    </Flex>
                </div>
                <Flex>
                    <Button style={{...textButtonStyle, color: token.colorPrimary}} onClick={editSelectedRecord}>
                        <EditOutlined></EditOutlined>
                    </Button>
                    <Button style={{...textButtonStyle, color: token.colorPrimary}} onClick={opedConfirmator}>
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