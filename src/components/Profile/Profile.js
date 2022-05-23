import './Profile.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {
    EMAIL_VALIDATION_ERROR,
    generateAuthError,
    NAME_VALIDATION_ERROR,
    userInfoUpdateSuccess
} from "../../utils/constants";

function Profile(props) {
    const {
        onLogout,
        onUpdate,
        isUpdateSucceed = null,
        isFetching,
    } = props;

    const [isDataChanged, setIsDataChanged] = useState(false)

    const {
        resetForm,
        values,
        errors,
        handleChange,
        isValid,
    } = useFormAndValidation();

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        resetForm(
            {
                name: currentUser.name,
                email: currentUser.email,
            },
            {},
            true,
        )
    }, [currentUser, resetForm])

    useEffect(() => {
        if (
            currentUser.name === values.name &&
            currentUser.email === values.email
        ) {
           setIsDataChanged(false)
        } else {
            setIsDataChanged(true)
        }
    }, [values.name, values.email, currentUser.name, currentUser.email])

    function handleSubmit() {
        const {name, email} = values;

        onUpdate(name, email);
    }

    return (
        <section className='profile'>
            <Form
                title={`Привет, ${currentUser.name}!`}
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
