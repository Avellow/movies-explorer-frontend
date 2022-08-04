import './Register.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import {NavLink, useHistory} from 'react-router-dom';
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {EMAIL_VALIDATION_ERROR, generateAuthError, NAME_VALIDATION_ERROR} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {registerUser, userLogin} from '../../store/slices/user/userAction';
import {selectUser} from '../../store/selectors/user/user-selectors';
import {resetErrorOnUser} from '../../store/slices/user/userSlice';

function Register() {

    const { loading, error, success } = useSelector(selectUser)

    // эффект при unmount
    useEffect(() => () => {
        if (error) {
            dispatch(resetErrorOnUser())
        }
    }, [])

    const dispatch = useDispatch()
    const history = useHistory();

    const {
        values,
        errors,
        handleChange,
        isValid,
    } = useFormAndValidation();

    const {email, password, username: name} = values

    useEffect(() => {
        if (success) {
            dispatch(userLogin({ email, password }))
        }
    },[dispatch, email, history, password, success])

    function handleRegister() {
        dispatch(registerUser({ name, email, password}))
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
                    disabled={loading}
                />
                <Input
                    labelTitle='E-mail'
                    name='email'
                    type='email'
                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    errored={errors['email']}
                    errorText={EMAIL_VALIDATION_ERROR}
                    onChange={handleChange}
                    value={values['email'] || ''}
                    required={true}
                    disabled={loading}
                />
                <Input
                    labelTitle='Пароль'
                    name='password'
                    type='password'
                    required={true}
                    errored={errors['password']}
                    errorText={errors['password']}
                    onChange={handleChange}
                    value={values['password'] || ''}
                    minLength={4}
                    disabled={loading}
                />
                {loading && (<Preloader isSmall={true}/>)}
                {error && (
                    <p className='register__error'>{generateAuthError(error)}</p>
                )}
                <Button
                    theme='auth'
                    text='Зарегистрироваться'
                    type='submit'
                    onClick={handleRegister}
                    disabled={!isValid || loading}
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
