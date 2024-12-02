import { Flex, Modal, theme } from "antd";

export interface ArticleProps {
    opened: boolean;
    setOpened: (value: boolean) => void;
    title: string;
    content: string;
}

function Article({ opened, setOpened, title, content }: ArticleProps) {
    const { token } = theme.useToken();

    function cancel() {
        setOpened(false);
    }

    function changeTagColors() {
        const tags = ["strong", "h1", "h2", "h3", "h4"];

        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = content;

        tags.forEach((tag) => {
            const elements = tempContainer.querySelectorAll(tag);
            elements.forEach((element) => {
                element.style.color = token.colorPrimary;
            });
        });

        return tempContainer.innerHTML;
    }

    return (
        <Modal
            open={opened}
            onCancel={cancel}
            width="700px"
            title=<b style={{ fontSize: "35px", color: token.colorPrimary }}>
                {title}
            </b>
            footer={null}
        >
            <Flex
                vertical
                style={{ height: "450px", overflow: "auto" }}
                align="lef"
                justify="center"
            >
                <Flex style={{ width: "90%" }}>
                    <div
                        dangerouslySetInnerHTML={{ __html: changeTagColors() }}
                    ></div>
                </Flex>
            </Flex>
        </Modal>
    );
}

export default Article;
