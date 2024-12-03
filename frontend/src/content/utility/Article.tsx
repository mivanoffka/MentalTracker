import { Flex, Modal, theme } from "antd";
import React from "react";
import { ReactElement, ReactNode } from "react";

export interface ArticleProps {
    opened: boolean;
    setOpened: (value: boolean) => void;
    title: string;
    content: ReactElement;
}

function Article({ opened, setOpened, title, content }: ArticleProps) {
    const { token } = theme.useToken();
    const tags = ["strong", "h1", "h2", "h3", "h4", "b"];

    function cancel() {
        setOpened(false);
    }

    // Рекурсивная функция для обработки children
    function applyStylesToTags(children: ReactNode): ReactNode {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;

            const { type, props } = child;
            if (typeof type === "string" && tags.includes(type)) {
                const color = token.colorPrimary; // Цвет для стилей
                const style = { color, ...(props.style || {}) };

                return React.cloneElement(child, { ...props, style }, applyStylesToTags(props.children));
            }

            // Рекурсивно обрабатываем вложенные элементы
            return React.cloneElement(child, { ...props }, applyStylesToTags(props.children));
        });
    }

    const styledContent = applyStylesToTags(content);

    return (
        <Modal
            open={opened}
            onCancel={cancel}
            width="700px"
            title={
                <b style={{ fontSize: "35px", color: token.colorPrimary }}>
                    {title}
                </b>
            }
            footer={null}
        >
            <Flex
                vertical
                style={{ height: "450px", overflow: "auto" }}
                align="left"
                justify="top"
            >
                <Flex style={{ width: "85%" }} align="left" justify="left">
                    {styledContent}
                </Flex>
            </Flex>
        </Modal>
    );
}

export default Article;
