import React from "react";
import { Context } from "../Context";
import { Flex, Button, theme } from "antd";
import { HeartFilled } from "@ant-design/icons";
import Confirmator from "../utility/Confirmator";
import Article from "../utility/Article";

function TopBar() {
    const { token } = theme.useToken();
    const context = React.useContext(Context);
    const [signOutConfirmatorOpened, setSignOutConfirmatorOpened] =
        React.useState(false);

    const [articleOpened, setArticleOpened] = React.useState(false);
    const [articleTitle, setArticleTitle] = React.useState("Sample text");
    const [articleContent, setArticleContent] = React.useState("Sample text");

    const guideContent = "Sample text"
    const mentalHealthContent =
        "<p>Ментальное здоровье является важной частью общего здоровья и благополучия человека. Оно включает в себя эмоциональное, психологическое и социальное благополучие. Ментальное здоровье влияет на то, как мы думаем, чувствуем и действуем в повседневной жизни, а также на то, как мы справляемся со стрессом, общаемся с другими и принимаем решения.</p> <h2>Основные ментальные заболевания</h2> <ul> <li><strong>Депрессия:</strong> Это расстройство характеризуется постоянным чувством грусти, утраты интереса к ранее любимым занятиям, а также физическими симптомами, такими как изменения аппетита и сна.</li> <li><strong>Тревожные расстройства:</strong> Это группа расстройств, включающая генерализованное тревожное расстройство, паническое расстройство и социальную фобию. Они характеризуются чрезмерной и постоянной тревогой и страхом.</li> <li><strong>Биполярное расстройство:</strong> Это расстройство характеризуется чередованием периодов депрессии и мании (чрезмерно приподнятого настроения), что существенно влияет на повседневную жизнь человека.</li> <li><strong>Шизофрения:</strong> Это серьезное психическое расстройство, которое влияет на мышление, восприятие, эмоции и поведение. Люди с шизофренией могут испытывать галлюцинации и бред.</li> <li><strong>Расстройства пищевого поведения:</strong> Эти расстройства включают анорексию, булимия и переедание, и характеризуются нездоровым отношением к еде и весу.</li> </ul>";

    function openConfirmator() {
        setSignOutConfirmatorOpened(true);
    }

    function openHealthArticle() {
        setArticleTitle("О ментальном здоровье");
        setArticleContent(mentalHealthContent);
        setArticleOpened(true);
    }
    
    function openGuideArticle() {
        setArticleTitle("Как пользоваться");
        setArticleContent(guideContent);
        setArticleOpened(true);
    }

    return (
        <Flex
            style={{ width: "80%" }}
            gap="middle"
            align="center"
            justify="space-between"
        >
            <Flex
                style={{ overflow: "hidden", width: "80%" }}
                align="center"
                justify="left"
                gap="middle"
            >
                <Flex style={{overflow: "hidden", minWidth: "30px"  }} >
                    <Flex gap="small">
                        <h2 style={{ color: context?.model?.primaryColor, minWidth: "30px" }}>
                            <HeartFilled />
                        </h2>
                        <h2>Mental</h2>
                    </Flex>

                    <h2 style={{ color: context?.model?.primaryColor }}>
                        Tracker
                    </h2>
                </Flex>
                <Flex
                    align="center"
                    justify="center"
                    gap="small"
                >
                    <Button
                        style={{ borderWidth: "0", color: token.colorPrimary, overflow: "hidden" }}
                        type="link"
                        onClick={openHealthArticle}
                    >
                        О ментальном здоровье
                    </Button>

                    <Button
                        style={{ borderWidth: "0",  color: token.colorPrimary,  overflow: "hidden"}}
                        type="link"
                        onClick={openGuideArticle}
                    >
                        Как пользоваться?
                    </Button>
                </Flex>
            </Flex>

            <Flex align="center" justify="center" gap="middle">
                {context?.user?.name}
                <Button
                    style={{
                        borderWidth: "0",
                        color: context?.model?.primaryColor,
                        width: "0px",
                        height: "0px",
                    }}
                    type="link"
                    onClick={openConfirmator}
                >
                    Выход
                </Button>
            </Flex>

            <Confirmator
                prompt="Вы действительно хотите выйти?"
                opened={signOutConfirmatorOpened}
                setOpened={setSignOutConfirmatorOpened}
                onYes={context?.logout}
                onNo={null}
            ></Confirmator>

            <Article
                opened={articleOpened}
                setOpened={setArticleOpened}
                title={articleTitle}
                content={articleContent}
            ></Article>
        </Flex>
    );
}

export default TopBar;
