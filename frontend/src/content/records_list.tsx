import {Button, Card, Flex, List } from "antd";
import React, {useEffect, useState } from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx"
import Record from "./record.tsx";
import RecordsListItem from "./records_list_item.tsx";
import Model from "./model.tsx";
import Editor from "./editor.tsx";
import dayjs from "dayjs";
import axios from "axios"

interface RecordsListProps {
    records: Record[];
    setRecords: (records: Record[]) => void;
    model: Model;
}

const RecordsList: React.FC<RecordsListProps> = ({records, setRecords, model}: RecordsListProps)=> {
    const [editorOpened, setEditorOpened] = useState<boolean>(false);

    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

    const openEditor = ()=> {
        setEditorOpened(true)

        setSelectedRecord(model.getDefaultRecord())
        console.log()
    }

    useEffect(() => {
        fetchRecords()
    }, [])

    function fetchRecords() {
        axios.get('http://localhost:8000/records/fetch/uid=10')
        .then(
            response  => {
                let records: Record[] = []
                for (let key in response.data) {
                    let record = response.data[key]
                    records.push(new Record(record["value"], dayjs(record["datetime"], "DD-MM-YYYY-HH:mm"), record["key"]))
                }
                setRecords(records)
            })
        .catch(
            error => {
                alert(error)
            }
        )
    }

    function saveRecord(record: Record) {
        if (record.id == -1) {
            let query = 'http://localhost:8000/records/add/uid=10&value=' + record.value + "&datetime=" + record.datetime.format("DD-MM-YYYY-HH:mm")
            axios.get(query)
            .then(
                response  => {
                    let records: Record[] = []
                    for (let key in response.data) {
                        let record = response.data[key]
                        records.push(new Record(record["value"], dayjs(record["datetime"], "DD-MM-YYYY-HH:mm"), record["key"]))
                    }
                    setRecords(records)
                })
            .catch(
                error => {
                    alert(error)
                }
            )
        }
    }

    function truncate() {
        axios.get('http://localhost:8000/records/truncate/uid=10')
        .then(
            response  => {
                let records: Record[] = []
                for (let key in response.data) {
                    let record = response.data[key]
                    records.push(new Record(record["value"], dayjs(record["datetime"], "DD-MM-YYYY-HH:mm"), record["key"]))
                }
                setRecords(records)
            })
        .catch(
            error => {
                alert(error)
            }
        )
    }

    return (
        <>
            <Card style={fullFillStyle}>
                <Flex vertical gap="middle" align="stretch" justify="stretch" style={fullWidthStyle}>
                    <List
                        dataSource={records}
                        renderItem={(record, index) => RecordsListItem({record, model})}>
                    </List>
                    <Button onClick={openEditor} type="primary" style={fullWidthStyle}>Внести</Button>
                    <Button onClick={truncate} style={fullWidthStyle}>Очистить</Button>
                </Flex>
            </Card>

            <Editor model={model}
                    opened={editorOpened} setOpened={setEditorOpened}
                    selectedRecord={selectedRecord}
                    saveRecord={saveRecord}>
            </Editor>
        </>

    )
}

export default RecordsList