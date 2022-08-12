import {useForm} from 'react-hook-form';
import {AuthInputField} from '../AuthInputField/AuthInputField';
import {AuthForm} from '../AuthForm/AuthForm';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../store/selectors/user/user-selectors';
import {useEffect} from 'react';
import {resetErrorOnUser, resetRegisterSuccessStatus} from '../../store/slices/user/userSlice';
import {useHistory} from 'react-router-dom';
import {registerUser} from '../../store/slices/user/userAction';
import Preloader from '../Preloader/Preloader';
import {generateAuthError} from '../../utils/constants';
import {emailRules, firstNameRule, passwordRules} from '../../utils/inputValidationRules';

export default function Register() {
    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
        reset,
        getValues,
    } = useForm({
        mode: 'onChange'
    })

    // redux && user register status
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(selectUser)

    // эффект при unmount - очищает отображаемую ошибку регистрации от сервера
    useEffect(() => () => {
        if (error) {
            dispatch(resetErrorOnUser())
        }
    }, [])


    const history = useHistory();
    // redirect на страницу логина при успешной регистрации и очищает через 3 секунды статус success (state.user)
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                history.push('/signin');
                dispatch(resetRegisterSuccessStatus())
            }, 3000)
        }
    }, [dispatch, history, success])

    const onSubmit = () => {
        const { firstName, email, password } = getValues()
        dispatch(registerUser({ name: firstName, email, password }))
        reset()
    }

    return (
        <section className="register">
            <AuthForm
                onSubmit={handleSubmit(onSubmit)}
                title="Добро пожаловать!"
                submitDisabled={!isValid}
                hintProps={{
                    text: 'Уже зарегистрированы?',
                    linkTo: '/signin',
                    linkText: 'Войти'
                }}

            >
                <AuthInputField
                    label="Ваше имя"
                    name="firstName"
                    register={register}
                    validationRules={firstNameRule}
                    errors={errors}
                    disabled={loading}
                />

                <AuthInputField
                    label="Email"
                    name="email"
                    register={register}
                    validationRules={emailRules}
                    errors={errors}
                    type="email"
                    disabled={loading}
                />

                <AuthInputField
                    label="Пароль"
                    name="password"
                    register={register}
                    validationRules={passwordRules}
                    errors={errors}
                    type="password"
                    disabled={loading}
                />

                {success && <p>Вы успешно зарегистрировались и будете перенаправлены на страницу логина</p>}

                {loading && <Preloader isSmall={true}/>}

                {error && <p className='register__error'>{generateAuthError(error)}</p>}
            </AuthForm>
        </section>
    )
}
