import logo from "../../images/header/logo.svg";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

function Login() {
    return (
        <section className='Auth'>
            <img
                className='Auth__logo'
                src={ logo }
                alt='логотип'
            />
            <Form
                title='Рады видеть!'
            >
                <Input name='E-mail' type='email' />
                <Input name='Пароль' type='password' />
                <Button
                    theme='auth'
                    text='Войти'
                />
                <p className='Form__hint'>
                    Ещё не зарегистрированы?
                    <a className='Form__hint-link' href='/'> Регистрация</a>
                </p>
            </Form>
        </section>
    )
}

export default Login;
