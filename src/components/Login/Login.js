import './Login.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import {NavLink} from 'react-router-dom';
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {EMAIL_VALIDATION_ERROR, generateAuthError} from "../../utils/constants";
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../store/slices/user/userAction';
import {selectUser} from '../../store/selectors/user/user-selectors';
import {resetErrorOnUser} from '../../store/slices/user/userSlice';

function Login() {

    const { loading: isLoading, error } = useSelector(selectUser)

    // эффект при unmount
    useEffect(() => () => {
        if (error) {
            dispatch(resetErrorOnUser())
        }
    }, [])

    const dispatch = useDispatch();

    const {
        values,
        errors,
        handleChange,
        isValid,
    } = useFormAndValidation();

    function handleLogin() {
        const { email, password } = values;
        dispatch(userLogin({ email, password }))
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
                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    onChange={handleChange}
                    value={values['email'] || ''}
                    errored={errors['email']}
                    errorText={EMAIL_VALIDATION_ERROR}
                    disabled={isLoading}
                />
                <Input
                    labelTitle='Пароль'
                    name='password'
                    type='password'
                    required={true}
                    onChange={handleChange}
                    value={values['password'] || ''}
                    minLength={4}
                    errored={errors['password']}
                    errorText={errors['password']}
                    disabled={isLoading}
                />
                {error && (
                    <p className='login__error'>{generateAuthError(error)}</p>
                )}
                <Button
                    theme='auth'
                    text='Войти'
                    onClick={handleLogin}
                    type='submit'
                    disabled={!isValid || isLoading}
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
