import {Button, Card, Flex, List, Input } from "antd";
import React, {ChangeEventHandler, useEffect, useState } from "react";
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
    uid: number;
    setUid: (value: number) => void;
}

const RecordsList: React.FC<RecordsListProps> = ({records, setRecords, model, uid, setUid}: RecordsListProps)=> {
    const [editorOpened, setEditorOpened] = useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

    const openEditor = ()=> {
        setSelectedRecord(model.getDefaultRecord())
        setEditorOpened(true)
    }

    function openEditorForExistingRecord(record: Record) {
        setSelectedRecord(record)
        setEditorOpened(true)
    }

    function applyIdEdit(event: React.FormEvent<HTMLInputElement>) {
        setUid(Number(event.currentTarget.value))
    }

    useEffect(() => {
        fetchRecords()
    }, [uid])

    function fetchRecords() {
        axios.get('http://localhost:8000/records/fetch/uid=' + uid)
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
            addRecord(record)
        }
        else {
            updateRecord(record)
        }
    }

    function addRecord(record: Record) {
        let query = 'http://localhost:8000/records/add/uid=' + uid + '&value=' + record.value + "&datetime=" + record.datetime.format("DD-MM-YYYY-HH:mm")
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

    function updateRecord(record: Record) {
        let query = 'http://localhost:8000/records/update/uid=' + uid + '&id=' + record.id + '&value=' + record.value + "&datetime=" + record.datetime.format("DD-MM-YYYY-HH:mm")
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

    function deleteRecord(record: Record) {
        let query = 'http://localhost:8000/records/delete/uid=' + uid + '&id=' + record.id
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

    return (
        <>
                <Flex vertical gap="middle" align="center" justify="center" style={fullWidthStyle}>
                        <List
                            style={{width: '100%', height: "500px", overflow: "auto"}}
                            bordered
                            dataSource={records.slice().reverse()}
                            renderItem={(record) => 
                            <RecordsListItem
                                record={record}
                                model={model}
                                deleteRecord={deleteRecord}
                                openEditor={openEditorForExistingRecord}>
                            </RecordsListItem>}>
                        </List>
                    <Flex gap="middle" style={fullWidthStyle}>
                        <Button style={{width: '70%', background: model.primaryColor}} type="primary" onClick={openEditor}>Внести</Button>
                        {/* <Button style={{width: '30%'}} onClick={truncate}>Очистить</Button> */}
                        <Input style={{width: '30%'}} value={uid} onChange={applyIdEdit} placeholder="User identificator"></Input>
                    </Flex>
                </Flex>

            <Editor model={model}
                    opened={editorOpened} setOpened={setEditorOpened}
                    selectedRecord={selectedRecord}
                    saveRecord={saveRecord}>
            </Editor>
        </>

    )
}

export default RecordsList