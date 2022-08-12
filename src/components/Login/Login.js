import './Login.css';
import {EMAIL_VALIDATION_ERROR, generateAuthError} from "../../utils/constants";
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../store/slices/user/userAction';
import {selectUser} from '../../store/selectors/user/user-selectors';
import {resetErrorOnUser} from '../../store/slices/user/userSlice';
import {useForm} from 'react-hook-form';
import {AuthForm} from '../AuthForm/AuthForm';
import {AuthInputField} from '../AuthInputField/AuthInputField';
import Preloader from '../Preloader/Preloader';
import {emailRules, passwordRules} from '../../utils/inputValidationRules';

function Login() {
    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
        getValues,
    } = useForm({
        mode: 'onChange'
    })

    // redux && user register status
    const dispatch = useDispatch();
    const { loading, error } = useSelector(selectUser)

    // сбрасывает отображаемые ошибки через 3 секунды
    useEffect(() => {
        if (error) {
            setTimeout(() => dispatch(resetErrorOnUser()), 3000)
        }
    }, [dispatch, error])


    function handleLogin() {
        const { email, password } = getValues()
        dispatch(userLogin({ email, password }))
    }

    return (
        <section className='login'>
            <AuthForm
                onSubmit={handleSubmit(handleLogin)}
                title='Рады видеть'
                buttonText='Войти'
                submitDisabled={!isValid}
                hintProps={{
                    text: 'Ещё не зарегистрированы?',
                    linkTo: '/signup',
                    linkText: 'Регистрация'
                }}
            >
                <AuthInputField
                    label='Email'
                    name='email'
                    register={register}
                    validationRules={emailRules}
                    errors={errors}
                    type='email'
                    disabled={loading}
                />

                <AuthInputField
                    label='Пароль'
                    name='password'
                    register={register}
                    validationRules={passwordRules}
                    errors={errors}
                    type='password'
                    disabled={loading}
                />
                {loading && <Preloader isSmall={true} />}
                {error && (
                    <p className='login__error'>{generateAuthError(error)}</p>
                )}
            </AuthForm>
        </section>
    )
}

export default Login;
