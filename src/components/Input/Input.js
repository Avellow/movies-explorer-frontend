

function Input(props) {
    const {
        name = 'Поле ввода',
        type = 'text',
        error = false,
    } = props;

    const generateClassName = (className, error) => {
        return error
            ? `${className} ${className}_errored`
            : className;
    }

    return (
        <div className={ generateClassName('Input', error) }>
            <label className='Input__name'>
                { name }
                <input
                    className={ generateClassName('Input__field', error) }
                    type={ type }
                />
            </label>
            { error && <span className='Input__error'>Что-то пошло не так</span> }
        </div>
    )
}

export default Input;
