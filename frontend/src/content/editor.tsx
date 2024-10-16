import {Button, DatePicker, TimePicker, Flex, Modal, Slider, Switch } from "antd"
import Model from "./model.tsx";
import Record from "./record.tsx";
import React, {useEffect, useState } from "react";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

interface EditorProps {
    model: Model;
    opened: boolean;
    setOpened: (value: boolean) => void;
    selectedRecord: Record | null;
    saveRecord: (record: Record) => void;
}

const Editor: React.FC<EditorProps> = ({model, opened, setOpened, selectedRecord, saveRecord}: EditorProps) => {
    const [useCurrentDate, setUseCurrentDate] = useState<boolean>(true);
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [sliderValue, setSliderValue] = useState<number>(0);

    React.useEffect(() => {
        if (opened) {
            if (selectedRecord !== null) {
                setSelectedDate(selectedRecord.datetime)
                setSliderValue(selectedRecord.value)
            }
        }
    }, [opened])

    const onCancel = () => {
        setOpened(false)
    }

    const onOk = () => {
        // setSelectedRecord(new Record(sliderValue, selectedDate, record.id))
        saveRecord(new Record(sliderValue, selectedDate, -1))
        setOpened(false)
    }

    function toggleUseCurrentDate() : void {
        setUseCurrentDate(!useCurrentDate)
    }

    useEffect(() => {
        console.log("interval set");
        const interval = setInterval(() => {
            console.log("Dayjs updated");
            setCurrentDate(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (useCurrentDate) {
            console.log("selected date updated")
            setSelectedDate(currentDate)
        }
    }, [currentDate, setSelectedDate, useCurrentDate])

    return (
        <Modal width="300px" open={opened} onCancel={onCancel} onOk={onOk}
               footer={
                   <Flex style={{width:"100%"}}  align="center" justify="center">
                       <Button onClick={onOk} style={{width:"100%"}} type="primary">ОК</Button>
                   </Flex>
               }
        >
            <Flex vertical align="center" justify="center">
                <Flex gap="middle" vertical align="center" justify="center" style={{height: "100%", width: "100%"}}>
                    <h2>Как самочувствие?</h2>
                    <Flex gap="middle" align="center" justify="center">
                        <img style={{width: "100px", height: "100px"}} src={model.getImageSource(sliderValue)}/>
                        <h3 style={{width: "100px"}}>{model.getLabel(sliderValue)}</h3>
                    </Flex>
                    <Slider
                        style={{width: "100%"}}
                        tooltip={{open: false}}
                        min={model.minValue}
                        max={model.maxValue}
                        value={sliderValue}
                        onChange={setSliderValue}
                    />
                    <Flex style={{width: "100%", height: "100%"}} align="center" justify="space-between">
                        Текущее время
                        <Switch value={useCurrentDate} onChange={toggleUseCurrentDate}/>
                    </Flex>
                    <Flex style={{width: "100%", height: "100%"}} align="center" justify="center"
                          gap="small">

                        <DatePicker style={{width: "60%", height: "100%"}} format="D MMMM YYYY"
                                    size="small"
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                    disabled={useCurrentDate}
                                    />

                        <TimePicker style={{width: "40%", height: "100%"}} format="HH:mm"
                                    size="small"
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                    disabled={useCurrentDate}
                                    needConfirm={false}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    )
}

export default Editor