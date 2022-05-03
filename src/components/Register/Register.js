import logo from "../../images/header/logo.svg";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

function Register() {
    return (
        <section className='Auth'>
            <img
                className='Auth__logo'
                src={ logo }
                alt='логотип'
            />
            <Form
                title='Добро пожаловать!'
                buttonText='Зарегистрироваться'
                hintText='Уже зарегистрированы?'
                hintLinkText='Войти'
            >
                <Input name='Имя'/>
                <Input name='E-mail' type='email'/>
                <Input name='Пароль' type='password'/>
                <Button
                    theme='auth'
                    text='Зарегистрироваться'
                />
                <p className='Form__hint'>
                    Уже зарегистрированы?
                    <a className='Form__hint-link' href='/'> Войти</a>
                </p>
            </Form>
        </section>
    )
}

export default Register;
