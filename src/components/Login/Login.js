import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

function Login(props) {
    const {
        onLogin,
    } = props;

    return (
        <section className='Auth'>
            <Logo
                marginBottom={40}
            />
            <Form
                title='Рады видеть!'
            >
                <Input name='E-mail' type='email' />
                <Input name='Пароль' type='password' />
                <Button
                    theme='auth'
                    text='Войти'
                    onClick={onLogin}
                />
                <p className='Form__hint'>
                    Ещё не зарегистрированы?
                    <a className='Form__hint-link' href='/signup'> Регистрация</a>
                </p>
            </Form>
        </section>
    )
}

export default Login;
