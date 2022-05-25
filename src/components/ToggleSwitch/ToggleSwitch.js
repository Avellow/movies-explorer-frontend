import './ToggleSwitch.css';

function ToggleSwitch(props) {
    const {
        text = '',
        onCheck,
        isChecked,
        ...restProps
    } = props;

    return (
        <div className='toggle-switch'>
            <label className='toggle-switch__container'>
                <input
                    type='checkbox'
                    className='toggle-switch__input'
                    onChange={onCheck}
                    checked={isChecked || false}
                    {...restProps}
                />
                <span className='toggle-switch__slider' />
            </label>
            <p className="toggle-switch__text">{ text }</p>
        </div>
    )
}

export default ToggleSwitch;
