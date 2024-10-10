import './App.css'
import Dashboard from "./contents/dashboard.jsx";
import Model from "./contents/model.jsx"
import Area from "./contents/area.jsx";
import {Flex} from "antd";

// import Dashboard from "./contents/dashboard.jsx";

function App() {
    const moodModel=new Model(
            "Настроение",0,100,
            [
                "Плохо",
                "Не очень",
                "Нейтрально",
                "Хорошо",
                "Прекрасно"
            ],
            [
                "https://em-content.zobj.net/source/apple/391/frowning-face_2639-fe0f.png",
                "https://em-content.zobj.net/source/apple/391/confused-face_1f615.png",
                "https://em-content.zobj.net/source/apple/391/neutral-face_1f610.png",
                "https://em-content.zobj.net/source/apple/391/hugging-face_1f917.png",
                "https://em-content.zobj.net/source/apple/391/grinning-face-with-smiling-eyes_1f604.png"
            ])

    return (
        <Flex style={{width: "100%", height:"100%"}} vertical gap="middle" align="center" justify="center">
            <Area model={moodModel} >

            </Area>
        </Flex>
    )


}

export default App;
