import './Profile.css';
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

function Profile(props) {
    const {
        onLogout,
    } = props;

    return (
        <section className='profile'>
            <Form
                title='Привет, Дмитрий!'
                isTitleCentered={true}
            >
                <Input name='Имя' className='profile-input' />
                <Input name='E-mail' type='email' className='profile-input' />

                <Button
                    text='Редактировать'
                    theme='edit'
                    type='submit'
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
