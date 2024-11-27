import {Button, Flex, Modal} from "antd"
import React from "react";


export interface ArticleProps {
    opened: boolean;
    setOpened: (value: boolean) => void;
    title: string;
    content: string
}

const Article: React.FC<ArticleProps> = ({opened, setOpened, title, content}) => {
    function cancel() {
        setOpened(false)
    }
    
    return (
        <Modal 
            open={opened}
            onCancel={cancel}
            width="700px"
            title=<b style={{fontSize: "35px"}}>{title}</b>
            footer={null}
        >       
                <Flex vertical style={{height: "450px", overflow: "auto"}} align="lef" justify="center">
                    <Flex style={{width: "90%", }}>
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </Flex>
                </Flex>

        </Modal>
    )
}

export default Article