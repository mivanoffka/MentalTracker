import { Button, Flex, List, Skeleton } from "antd";
import React from "react";
import { fullFillStyle, fullWidthStyle } from "../utility/styles.tsx";
import Record from "../types/Record.tsx";
import RecordsListItem from "./RecordsListItem.tsx";
import Editor from "./Editor.tsx";
import { Context } from "../Context.tsx";
import RecordsListSkeleton from "./RecordsListSkeleton.tsx";

function RecordsList() {
    const [editorOpened, setEditorOpened] = React.useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = React.useState<Record | null>(
        null
    );
    const context = React.useContext(Context);

    const openEditor = () => {
        setSelectedRecord(context?.model?.getDefaultRecord() ?? null);
        setEditorOpened(true);
    };

    function openEditorForExistingRecord(record: Record) {
        setSelectedRecord(record);
        setEditorOpened(true);
    }

    const skeleton = (
        <Flex style={{ width: "100%", height: "100%" }}>
            <Skeleton.Button
                active
                block
                style={{ width: "100%", height: "100%", overflow: "auto" }}
            ></Skeleton.Button>
        </Flex>
    );

    const list = (
        <List
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            bordered
            dataSource={context?.records !== null ? context?.records.slice().reverse() : []}
            renderItem={(record) => (
                <RecordsListItem
                    record={record}
                    openEditor={openEditorForExistingRecord}
                ></RecordsListItem>
            )}
        ></List>
    );

    return (
        <>
            <Flex
                vertical
                gap="middle"
                align="center"
                justify="center"
                style={fullFillStyle}
            >   
                {context?.records !== null ? list : skeleton}

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
            ></Editor>
        </>
    );
}

export default RecordsList;
