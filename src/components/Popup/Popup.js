import Button from "../Button/Button";

function Popup(props) {
    const {
        isOpened = true,
        onClose,
        name = 'menu',
        children,
    } = props;

    return (
        <section className={`Popup${isOpened ? ` Popup_opened` : ''}`}>
            <div className={`Popup__container Popup__container_type_${name}`}>
                <Button theme='close' onClick={onClose}/>
                {children}
            </div>
        </section>
    )
}

export default Popup;
