export enum StatusCode {
    Ok = 0,
    UnknownError = 1,
    UserExists = 2,
    UserNotFound = 3,
    InvalidPassword = 4,
}

export const messages: { [key in StatusCode]: string } = {
    0: "ОК",
    1: "Неизвестная ошибка",
    2: "Пользователь с таким именем уже существует",
    3: "Пользователя с таким именем не существует",
    4: "Неверный пароль",
};
