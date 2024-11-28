import { Button, Card, Flex, List, Input } from "antd";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { fullFillStyle, fullWidthStyle } from "./styles.tsx";
import Record from "./record.tsx";
import RecordsListItem from "./records_list_item.tsx";
import Editor from "./editor.tsx";
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
                            deleteRecord={context?.deleteRecord}
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
                saveRecord={context?.saveRecord}
            ></Editor>
        </>
    );
};

export default RecordsList;
