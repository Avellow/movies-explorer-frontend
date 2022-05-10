import './Input.css';

function Input(props) {
    const {
        name = 'Поле ввода',
        className = 'input',
        type = 'text',
        errored = false,
    } = props;

    const generateClassName = (className) => {
        return errored
            ? `${className} ${className}_errored`
            : className;
    }

    return (
        <div className={ generateClassName(className) }>
            <label className={`${className}__name`}>
                { name }
                <input
                    className={ generateClassName(`${className}__field`) }
                    type={ type }
                />
            </label>
            { errored && <span className={`${className}__error`}>Что-то пошло не так</span> }
        </div>
    )
}

export default Input;
