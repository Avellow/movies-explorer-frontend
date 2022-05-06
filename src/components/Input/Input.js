function Input(props) {
    const {
        name = 'Поле ввода',
        type = 'text',
        errored = false,
    } = props;

    return (
        <div className='Input'>
            <label className='Input__name'>
                { name }
                <input
                    className={`Input__field ${errored && 'Input__field_errored'}`}
                    type={ type }
                />
            </label>
            { errored && <span className='Input__error'>Что-то пошло не так</span> }
        </div>
    )
}

export default Input;
