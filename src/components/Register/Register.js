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
import {registerUser} from '../../store/reducers/auth/user/userAction';

function Register(props) {
    const {
        onRegister,
        registrationStatus,
        isFetching,
        cleanError
    } = props;

    useEffect(() => cleanError(), [cleanError]);

    // redux
    const { loading, userInfo, error, success } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        if (success) history.push('/signin')
    },[history, success])

    // end redux

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
        dispatch(registerUser({ name, email, password}))
        //onRegister(name, email, password)
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
                    disabled={isFetching}
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
                    disabled={isFetching}
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
                    disabled={isFetching}
                />
                {isFetching && (<Preloader isSmall={true}/>)}
                {!registrationStatus.success && (
                    <p className='register__error'>{generateAuthError(registrationStatus.err)}</p>
                )}
                <Button
                    theme='auth'
                    text='Зарегистрироваться'
                    type='submit'
                    onClick={handleRegister}
                    disabled={!isValid || isFetching}
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
