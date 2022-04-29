import Input from '../Input/Input';
import Button from "../Button/Button";

function Form(props) {
    const {
        title,
        children,
        buttonText = '',
        hintText = '',
        hintLink = '',
        hintLinkText = '',
    } = props;

    return (
        <form className='Form'>
            <h2 className='Form__title'>{ title }</h2>
            { children }
            <Button
                theme='auth'
                text={buttonText}
            />
            { hintText && <p className='Form__hint'>
                {`${hintText} `}
                <a className='Form__hint-link' href={hintLink}>{`${hintLinkText}`}</a>
            </p> }
        </form>
    )
}

export default Form;
