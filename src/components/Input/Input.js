

function Input(props) {
    const {
        name = 'Поле ввода',
        className = 'Input',
        type = 'text',
        error = false,
    } = props;

    const generateClassName = (className, error) => {
        return error
            ? `${className} ${className}_errored`
            : className;
    }

    return (
        <div className={ generateClassName(className, error) }>
            <label className={`${className}__name`}>
                { name }
                <input
                    className={ generateClassName(`${className}__field`, error) }
                    type={ type }
                />
            </label>
            { error && <span className={`${className}__error`}>>Что-то пошло не так</span> }
        </div>
    )
}

export default Input;
