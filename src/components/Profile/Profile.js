import './Profile.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {
    EMAIL_VALIDATION_ERROR,
    generateAuthError,
    NAME_VALIDATION_ERROR,
    userInfoUpdateSuccess
} from "../../utils/constants";
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../store/selectors/user/user-selectors';

function Profile(props) {
    const {
        onLogout,
        onUpdate,
        isUpdateSucceed = null,
        isFetching,
    } = props;

    const userInfo = useSelector(selectUserInfo)

    const [isDataChanged, setIsDataChanged] = useState(false)

    const {
        resetForm,
        values,
        errors,
        handleChange,
        isValid,
    } = useFormAndValidation();

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

    useEffect(() => {
        if (
            userInfo.name === values.name &&
            userInfo.email === values.email
        ) {
           setIsDataChanged(false)
        } else {
            setIsDataChanged(true)
        }
    }, [values.name, values.email, userInfo.name, userInfo.email])

    function handleSubmit() {
        const {name, email} = values;

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
                    pattern='[a-zA-Zа-яА-ЯёЁ]+[- a-zA-Zа-яА-ЯёЁ]{1,}'
                    disabled={isFetching}
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
                    disabled={isFetching}
                />

                {
                    (isUpdateSucceed === false && (<p className='profile__error'>{generateAuthError()}</p>))
                    || (isUpdateSucceed === true && (<p className='profile__success'>{userInfoUpdateSuccess}</p>))
                }

                <Button
                    text='Редактировать'
                    theme='edit'
                    type='submit'
                    onClick={handleSubmit}
                    disabled={!isValid || isFetching || !isDataChanged}
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
