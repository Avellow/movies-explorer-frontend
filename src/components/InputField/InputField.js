import profileStyle from './ProfileInputField.module.css'
import authStyle from './AuthInputField.module.css'

export default function InputField(props) {
    const {
        label,
        name,
        register,
        validationRules = {},
        errors,
        styleType,
        ...rest
    } = props

    const style = {
        profile: profileStyle,
        auth: authStyle,
    }

    return (
        <div className={style[styleType].field}>
            <label className={style[styleType].label}>
                { label }
                <input
                    className={style[styleType].input}
                    {...register(name, validationRules)}
                    {...rest}
                />
            </label>
            <div className={style[styleType].errorContainer}>
                {errors[name] && <p className={style[styleType].error}>{errors[name].message || 'Ошибка валидации'}</p>}
            </div>
        </div>
    )
}
