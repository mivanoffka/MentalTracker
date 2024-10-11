import { Button, Card, Flex, List, Modal, Slider, TimePicker, DatePicker, Switch } from "antd";
import React, { useState } from "react";
import Model from "./content/model";
import Record from "./content/record";

const App: React.FC = () => {
    const [editorOpened, setEditorOpened] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(500);

    const model = new Model(
        "Настроение", 0, 1000,
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

    const [currentData, setCurrentData] = useState<Record[]>([]);

    const openEditor = () => {
        setEditorOpened(true);
    }

    const closeEditor = () => {
        setEditorOpened(false);
    }

    const addRecord = () => {
        const newRecord = new Record(sliderValue, new Date());
        setCurrentData([...currentData, newRecord]);
        setEditorOpened(false);
    }

    return (
        <Flex style={{width: "100%", height: "100%"}} vertical gap="middle" align="center" justify="center">
            <Flex style={{width: "100%", height: "100%"}} horizontal gap="middle" align="center" justify="center">
                <Flex style={{width: "1100px", height: "600px"}} vertical gap="middle" align="center" justify="center">
                    <Flex style={{width: "100%", height: "90%"}} gap="middle">
                        <Card style={{width: "30%", height: "100%"}}>
                            <Flex vertical gap="middle" align="center" justify="center">
                                <div style={{ height: '440px', overflowY: 'auto' }}>
                                    <List
                                        dataSource={currentData.slice().reverse()}
                                        bordered
                                        style={{width: "100%"}}
                                        renderItem={(item, index) => (
                                            <List.Item style={{alignItems: "center", display: "flex", gap: "45px"}}>
                                                <div style={{alignItems: "center", display: "flex", gap: "10px"}}>
                                                    <img height="30" width="30" src={model.getImageSource(item.value)} alt="status" />
                                                    <b>{model.getLabel(item.value)}</b>
                                                </div>
                                                {`${item.datetime.getHours().toString().padStart(2, '0')}:${item.datetime.getMinutes().toString().padStart(2, '0')}`}
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <Button onClick={openEditor} type="primary" style={{width: "100%"}}>Внести</Button>
                            </Flex>
                        </Card>
                        <Card style={{width: "70%", height: "100%"}}></Card>

                        <Modal width="300px" open={editorOpened} onCancel={closeEditor} onOk={closeEditor}
                               footer={
                                   <Flex horizontal style={{width:"100%"}}  align="center" justify="center">
                                       <Button onClick={addRecord} style={{width:"90%"}} type="primary">ОК</Button>
                                   </Flex>
                               }
                        >
                            <Flex vertical align="center" justify="center">
                                <Flex gap="middle" vertical align="center" justify="center" style={{height: "90%", width: "90%"}}>
                                    <h2>Как самочувствие?</h2>
                                    <Flex horizontal gap="middle" align="center" justify="center">
                                        <img style={{width: "100px", height: "100px"}} src={model.getImageSource(sliderValue)} />
                                        <h3 style={{width: "100px"}}>{model.getLabel(sliderValue)}</h3>
                                    </Flex>
                                    <Slider
                                        style={{width: "100%"}}
                                        tooltip={{ open: false }}
                                        range
                                        defaultValue={[0, 100]}
                                        value={sliderValue}
                                        onChange={setSliderValue}
                                    />
                                    <Flex style={{width: "100%", height: "100%"}} horizontal align="center" justify="space-between">
                                        Текущее время
                                        <Switch />
                                    </Flex>
                                    <Flex horizontal align="center" justify="center" gap="middle">
                                        <DatePicker size="small" />
                                        <TimePicker size="small" />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Modal>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default App;
