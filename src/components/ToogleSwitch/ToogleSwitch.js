function ToogleSwitch(props) {
    const {
        text = '',
    } = props;

    return (
        <div className='ToogleSwitch'>
            <label className='ToogleSwitch__container'>
                <input type='checkbox' className='ToogleSwitch__input' />
                <span className='ToogleSwitch__slider' />
            </label>
            <p className="ToogleSwitch__text">{ text }</p>
        </div>
    )
}

export default ToogleSwitch;
