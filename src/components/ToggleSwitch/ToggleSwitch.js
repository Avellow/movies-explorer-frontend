import './ToggleSwitch.css';

function ToggleSwitch(props) {
    const {
        text = '',
    } = props;

    return (
        <div className='toggle-switch'>
            <label className='toggle-switch__container'>
                <input type='checkbox' className='toggle-switch__input' />
                <span className='toggle-switch__slider' />
            </label>
            <p className="toggle-switch__text">{ text }</p>
        </div>
    )
}

export default ToggleSwitch;
