function Form(props) {
    const {
        title,
        isTitleCentered = false,
        children,
    } = props;

    return (
        <form className='Form'>
            <h2
                className='Form__title'
                style={isTitleCentered ? { textAlign: 'center'} : {}}
            >
                { title }
            </h2>
            { children }
        </form>
    )
}

export default Form;
