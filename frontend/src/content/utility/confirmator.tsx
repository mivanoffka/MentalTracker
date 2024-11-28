import {Button, Flex, Modal} from "antd"
import React from "react";


interface Confirmator {
    opened: boolean;
    setOpened: (value: boolean) => void;
    prompt: string;
    onYes: (() => any) | null | void;
    onNo: (() => any) | null| void;
}

const Confirmator: React.FC<Confirmator> = ({opened, setOpened, prompt, onYes=null, onNo=null}) => { 
    function _onYes() {
        setOpened(false)
        if (onYes !== null) {
            onYes()
        }
    }

    function _onNo() {
        setOpened(false)
        if (onNo !== null) {
            onNo()
        }
    }

    function cancel() {
        setOpened(false)
    }

    return (
        <Modal 
            open={opened}
            width="300px"
            onCancel={cancel}
            footer={
                    <Flex style={{width:"100%"}}  align="center" justify="center" gap="small">
                        <Button onClick={_onYes} style={{width:"60%"}} type="primary">Да</Button>
                        <Button onClick={_onNo} style={{width:"40%"}} >Нет</Button>
                    </Flex>
            }
        >
                <h2 style={{textAlign: "center"}}>
                    {prompt}
                </h2>
        </Modal>
    )
}

export default Confirmator