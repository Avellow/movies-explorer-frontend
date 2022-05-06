import './Register.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import {NavLink} from "react-router-dom";

function Register() {
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
                <Input name='Имя'/>
                <Input name='E-mail' type='email' errored={true}/>
                <Input name='Пароль' type='password' errored={true}/>
                <Button
                    theme='auth'
                    text='Зарегистрироваться'
                    type='submit'
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
