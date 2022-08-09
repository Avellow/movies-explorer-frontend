import style from './AuthForm.module.css'
import Logo from '../Logo/Logo';
import {AuthHint} from '../AuthHint/AuthHint';

export function AuthForm(props) {
    const {
        title,
        children,
        buttonText = 'Отправить',
        onSubmit,
        submitDisabled,
        hintProps,
    } = props

    return (
        <form className={style.form} onSubmit={onSubmit}>
            <Logo/>
            <h2 className={style.title}>{ title }</h2>
            { children }
            <input
                className={style.submit}
                type='submit'
                value={buttonText}
                disabled={submitDisabled}
            />
            <AuthHint {...hintProps} />
        </form>
    )
}
