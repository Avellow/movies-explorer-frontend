import style from './ProfileInputField.module.css'

export default function ProfileInputField(props) {
    const {
        label,
        name,
        register,
        validationRules = {},
        errors,
        ...rest
    } = props

    return (
        <div className={style.field}>
            <label className={style.label}>
                { label }
                <input
                    className={style.input}
                    {...register(name, validationRules)}
                    {...rest}
                />
            </label>
            <div className={style.errorContainer}>
                {errors[name] && <p className={style.error}>{errors[name].message || 'Ошибка валидации'}</p>}
            </div>
        </div>
    )
}
