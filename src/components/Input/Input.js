import './Input.css';

function Input(props) {
    const {
        labelTitle = 'Поле ввода',
        className = 'input',
        type = 'text',
        errored = false,
        errorText,
        ...inputProps
    } = props;

    const generateClassName = (className) => {
        return errored
            ? `${className} ${className}_errored`
            : className;
    }

    return (
        <div className={ generateClassName(className) }>
            <label className={`${className}__name`}>
                { labelTitle }
                <input
                    className={ generateClassName(`${className}__field`) }
                    type={ type }
                    {...inputProps}
                />
            </label>
            { errored && <span className={`input__error`}>{errorText}</span> }
        </div>
    )
}

export default Input;
