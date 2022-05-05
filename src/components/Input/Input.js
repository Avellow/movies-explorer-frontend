

function Input(props) {
    const {
        name = 'Поле ввода',
        className = 'Input',
        type = 'text',
        errored = false,
    } = props;

    const generateClassName = (className, errored) => {
        return errored
            ? `${className} ${className}_errored`
            : className;
    }

    return (
        <div className={ generateClassName(className, errored) }>
            <label className={`${className}__name`}>
                { name }
                <input
                    className={ generateClassName(`${className}__field`, errored) }
                    type={ type }
                />
            </label>
            { errored && <span className={`${className}__error`}>Что-то пошло не так</span> }
        </div>
    )
}

export default Input;
