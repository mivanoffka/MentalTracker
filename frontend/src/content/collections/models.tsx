import Model from "../types/Model";

const blue: string = "#1677ff";
const red: string = "#f5222d";
const green: string = "#52c41a";

const moodModel: Model = new Model(
    0,
    "Настроение",
    0,
    1000,
    500,
    ["Плохо", "Не очень", "Нейтрально", "Хорошо", "Прекрасно"],
    [
        "src/assets/mood/sad.png",
        "src/assets/mood/upset.png",
        "src/assets/mood/neutral.png",
        "src/assets/mood/ok.png",
        "src/assets/mood/fine.png",
    ],
    blue,
    "#CCDFFF"
);

const anxietyModel: Model = new Model(
    1,
    "Тревожность",
    0,
    1000,
    250,
    ["Безразличие", "Спокойствие", "Беспокойство", "Тревога", "Паника"],
    [
        "src/assets/anxiety/0.png",
        "src/assets/anxiety/1.png",
        "src/assets/anxiety/2.png",
        "src/assets/anxiety/3.png",
        "src/assets/anxiety/4.png",
    ],
    red,
    "#CCDFFF"
);

const models = [moodModel, anxietyModel];
export default models;
