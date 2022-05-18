import './Profile.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useContext, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {NAME_VALIDATION_ERROR} from "../../utils/constants";

function Profile(props) {
    const {
        onLogout,
        onUpdate,
    } = props;

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
                />
                <Input
                    name='email'
                    type='email'
                    className='profile-input'
                    labelTitle='Почта'
                    required={true}
                    value={values['email'] || ''}
                    onChange={handleChange}
                    errored={errors['email']}
                    errorText={errors['email']}
                />

                <Button
                    text='Редактировать'
                    theme='edit'
                    type='submit'
                    onClick={handleSubmit}
                    disabled={!isValid}
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
