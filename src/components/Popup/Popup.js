import './Popup.css';
import Button from "../Button/Button";

function Popup(props) {
    const {
        isOpened = true,
        onClose,
        name = 'menu',
        children,
    } = props;

    return (
        <div className={`popup${isOpened ? ` popup_opened` : ''}`}>
            <div className={`popup__container popup__container_type_${name}`}>
                <Button theme='close' onClick={onClose}/>
                {children}
            </div>
        </div>
    )
}

export default Popup;
