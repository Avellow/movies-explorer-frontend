import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

function Profile() {
    return (
        <section className='Profile'>
            <Form
                title='Привет, Дмитрий!'
                isTitleCentered={true}
            >
                <Input name='Имя' className='ProfileInput' />
                <Input name='E-mail' type='email' className='ProfileInput' />

                <Button
                    text='Редактировать'
                    theme='edit'
                />
                <Button
                    text='Выйти из аккаунта'
                    theme='exit'
                />
            </Form>
        </section>
    )
}

export default Profile;
