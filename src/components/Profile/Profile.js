import './Profile.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useEffect} from 'react';
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {
    EMAIL_VALIDATION_ERROR,
    generateAuthError,
    NAME_VALIDATION_ERROR,
    userInfoUpdateSuccess
} from "../../utils/constants";
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../store/selectors/user/user-selectors';
import {resetErrorOnUser} from '../../store/slices/user/userSlice';

function Profile(props) {
    console.log('profile render')
    const {
        onUpdate,
        onLogout,
    } = props;

    const dispatch = useDispatch();
    const { loading, userInfo, error } = useSelector(selectUser)

    const {
        resetForm,
        values,
        errors,
        handleChange,
        isValid,
    } = useFormAndValidation();

    const { name, email } = values

    useEffect(() => {
        resetForm(
            {
                name: userInfo.name,
                email: userInfo.email,
            },
            {},
            true,
        )
    }, [userInfo, resetForm])

    // эффект при unmount
    useEffect(() => () => {
        if (error) {
            dispatch(resetErrorOnUser())
        }
    }, [])

    const checkIfUserInfoChanged = () => userInfo.name === name && userInfo.email === email

    function handleSubmit() {
        const { name, email } = values;
        onUpdate(name, email);
    }

    return (
        <section className='profile'>
            <Form
                title={`Привет, ${userInfo.name}!`}
                isTitleCentered={true}
            >
                <Input
                    name='name'
                    className='profile-input'
                    labelTitle='Имя'
                    value={values['name'] || ''}
                    onChange={handleChange}
                    required={true}
                    errored={errors['name']}
                    errorText={NAME_VALIDATION_ERROR}
                    pattern='[a-zA-Zа-яА-ЯёЁ]+[- a-zA-Zа-яА-ЯёЁ]{3,}'
                    disabled={loading}
                />
                <Input
                    name='email'
                    type='email'
                    className='profile-input'
                    labelTitle='Почта'
                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    errorText={EMAIL_VALIDATION_ERROR}
                    required={true}
                    value={values['email'] || ''}
                    onChange={handleChange}
                    errored={errors['email']}
                    disabled={loading}
                />

                {
                    error && (<p className='profile__error'>{generateAuthError()}</p>)
                }

                <Button
                    text='Редактировать'
                    theme='edit'
                    type='submit'
                    onClick={handleSubmit}
                    disabled={!isValid || loading || checkIfUserInfoChanged()}
                />
                <Button
                    text='Выйти из аккаунта'
                    theme='exit'
                    onClick={onLogout}
                />
            </Form>
        </section>
    )
}

export default Profile;
