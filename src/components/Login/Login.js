import './Login.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import {NavLink} from "react-router-dom";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {generateAuthError} from "../../utils/constants";

function Login(props) {
    const {
        onLogin,
        loginStatus,
        isFetching,
    } = props;

    const {
        values,
        errors,
        handleChange,
        isValid,
    } = useFormAndValidation();

    function handleLogin() {
        const { email, password } = values;
        onLogin(email, password);
    }

    return (
        <section className='login'>
            <Logo
                marginBottom={40}
            />
            <Form
                title='Рады видеть!'
            >
                <Input
                    labelTitle='E-mail'
                    name='email'
                    type='email'
                    required={true}
                    onChange={handleChange}
                    errored={errors['email']}
                    errorText={errors['email']}
                />
                <Input
                    labelTitle='Пароль'
                    name='password'
                    type='password'
                    required={true}
                    onChange={handleChange}
                    minLength={4}
                    errored={errors['password']}
                    errorText={errors['password']}
                />
                {!loginStatus.success && (
                    <p className='login__error'>{generateAuthError(loginStatus.err)}</p>
                )}
                <Button
                    theme='auth'
                    text='Войти'
                    onClick={handleLogin}
                    type='submit'
                    disabled={!isValid}
                />
                <p className='form__hint'>
                    Ещё не зарегистрированы?
                    <NavLink className='form__hint-link' to='/signup'> Регистрация</NavLink>
                </p>
            </Form>
        </section>
    )
}

export default Login;
