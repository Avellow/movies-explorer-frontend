import style from './ProfileForm.module.css'

export default function ProfileForm(props) {
    const {
        title,
        children,
        buttonText = 'Отправить',
        onSubmit,
        onLogout,
        submitDisabled,
    } = props

    return (
        <form className={style.form} onSubmit={onSubmit}>
            <h2 className={style.title}>{ title }</h2>
            { children }
            <input
                className={style.submit}
                type='submit'
                value={buttonText}
                disabled={submitDisabled}
            />
            <button
                className={style.logout}
                onClick={onLogout}
            >Выйти из аккаунта</button>
        </form>
    )
}
