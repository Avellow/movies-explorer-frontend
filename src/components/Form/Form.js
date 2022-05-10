import './Form.css';

function Form(props) {
    const {
        title,
        isTitleCentered = false,
        children,
    } = props;

    return (
        <form className='form'>
            <h2
                className='form__title'
                style={isTitleCentered ? { textAlign: 'center'} : {}}
            >
                { title }
            </h2>
            { children }
        </form>
    )
}

export default Form;
