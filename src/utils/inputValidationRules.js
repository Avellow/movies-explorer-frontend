export const firstNameRule = {
    required: 'Поле обязательно к заполнению!',
    minLength: {
        value: 4,
        message: 'Минимум 4 символа'
    },
    pattern: {
        value: /[a-zA-Zа-яА-ЯёЁ]+[- a-zA-Zа-яА-ЯёЁ]+/,
        message: 'Допускаются только буквенные символы'
    }
}

export const emailRules = {
    required: 'Поле обязательно к заполнению!',
    minLength: {
        value: 4,
        message: 'Минимум 4 символа'
    },
    pattern: {
        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        message: 'Введенный email невалиден'
    }
}

export const passwordRules = {
    required: 'Введите пароль!',
    minLength: {
        value: 4,
        message: 'Минимум 4 символа'
    }
}
