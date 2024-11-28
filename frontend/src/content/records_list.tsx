import { Button, Card, Flex, List, Input } from "antd";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx";
import Record from "./record.tsx";
import RecordsListItem from "./records_list_item.tsx";
import Model from "./model.tsx";
import Editor from "./editor.tsx";
import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";
import { Context } from "./authcontext.tsx";


const RecordsList: React.FC = () => {
    const [editorOpened, setEditorOpened] = useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
    const context = React.useContext(Context);

    
    const openEditor = () => {
        setSelectedRecord(context?.model?.getDefaultRecord());
        setEditorOpened(true);
    };

    function openEditorForExistingRecord(record: Record) {
        setSelectedRecord(record);
        setEditorOpened(true);
    }

    useEffect(() => {
        fetchRecords();
    }, [context?.user, context?.model]);

    function fillList(response: AxiosResponse<any, any>) {
        const status = Number(response.data["status"]);
        const content = response.data["content"];

        if (status == 0) {
            let records: Record[] = [];
            for (let key in content) {
                let record = content[key];
                records.push(
                    new Record(
                        record["value"],
                        dayjs(record["datetime"], "DD-MM-YYYY-HH:mm"),
                        record["key"]
                    )
                );
            }
            context?.setRecords(records);
        } else {
            alert(content["message"]);
        }
    }

    function fetchRecords() {
        axios
            .get(
                "http://localhost:8000/records/fetch/token=" +
                    context?.user?.token +
                    "&model=" +
                    context?.model?.index
            )
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function saveRecord(record: Record) {
        if (record.id == -1) {
            addRecord(record);
        } else {
            updateRecord(record);
        }
    }

    function addRecord(record: Record) {
        let query =
            "http://localhost:8000/records/add/token=" +
            context?.user?.token +
            "&value=" +
            record.value +
            "&datetime=" +
            record.datetime.format("DD-MM-YYYY-HH:mm") +
            "&model=" +
            context?.model?.index;
        axios
            .get(query)
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function updateRecord(record: Record) {
        let query =
            "http://localhost:8000/records/update/token=" +
            context?.user?.token +
            "&id=" +
            record.id +
            "&value=" +
            record.value +
            "&datetime=" +
            record.datetime.format("DD-MM-YYYY-HH:mm") +
            "&model=" +
            context?.model?.index;
        axios
            .get(query)
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function deleteRecord(record: Record) {
        let query =
            "http://localhost:8000/records/delete/token=" +
            context?.user?.token +
            "&id=" +
            record.id +
            "&model=" +
            context?.model?.index;
        axios
            .get(query)
            .then((response) => {
                fillList(response);
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <>
            <Flex
                vertical
                gap="middle"
                align="center"
                justify="center"
                style={fullFillStyle}
            >
                <List
                    style={{ width: "100%", height: "100%", overflow: "auto" }}
                    bordered
                    dataSource={context?.records.slice().reverse()}
                    renderItem={(record) => (
                        <RecordsListItem
                            record={record}
                            deleteRecord={deleteRecord}
                            openEditor={openEditorForExistingRecord}
                        ></RecordsListItem>
                    )}
                ></List>
                <Flex gap="middle" style={fullWidthStyle}>
                    <Button
                        style={fullWidthStyle}
                        type="primary"
                        onClick={openEditor}
                    >
                        Внести
                    </Button>
                </Flex>
            </Flex>

            <Editor
                opened={editorOpened}
                setOpened={setEditorOpened}
                selectedRecord={selectedRecord}
                saveRecord={saveRecord}
            ></Editor>
        </>
    );
};

export default RecordsList;
