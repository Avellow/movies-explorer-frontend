import './Register.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import {NavLink} from "react-router-dom";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {NAME_VALIDATION_ERROR} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";

function Register(props) {
    const { onRegister,
        isFetching } = props;

    const {
        values,
        errors,
        handleChange,
        isValid,
    } = useFormAndValidation();

    function handleRegister() {
        const {
            email,
            password,
            username: name,
        } = values;

        onRegister(name, email, password)
    }

    return (
        <section className='register'>
            <Logo
                marginBottom={40}
            />
            <Form
                title='Добро пожаловать!'
                buttonText='Зарегистрироваться'
                hintText='Уже зарегистрированы?'
                hintLinkText='Войти'
            >
                <Input
                    labelTitle='Имя'
                    name='username'
                    onChange={handleChange}
                    value={values['username'] || ''}
                    pattern='[a-zA-Zа-яА-ЯёЁ]+[- a-zA-Zа-яА-ЯёЁ]{1,}'
                    errored={errors['username']}
                    errorText={NAME_VALIDATION_ERROR}
                    required={true}
                    minLength={2}
                    maxLength={30}
                />
                <Input
                    labelTitle='E-mail'
                    name='email'
                    type='email'
                    errored={errors['email']}
                    errorText={errors['email']}
                    onChange={handleChange}
                    required={true}
                />
                <Input
                    labelTitle='Пароль'
                    name='password'
                    type='password'
                    required={true}
                    errored={errors['password']}
                    errorText={errors['password']}
                    onChange={handleChange}
                    minLength={4}
                />
                <Button
                    theme='auth'
                    text='Зарегистрироваться'
                    type='submit'
                    onClick={handleRegister}
                    disabled={!isValid}
                />
                <p className='form__hint'>
                    Уже зарегистрированы?
                    <NavLink className='form__hint-link' to='/signin'> Войти</NavLink>
                </p>
            </Form>
        </section>
    )
}

export default Register;
