import './SearchForm.css';
import searchIcon from '../../images/searchform/icon.svg';
import Button from "../Button/Button";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState } from "react";

function SearchForm(props) {
    const { onSubmit } = props;

    const [value, setValue] = useState('');
    const [isErrored, setIsErrored] = useState(false);

    function handleChange(e) {
        setValue(e.target.value)
    }

    function handleSubmit() {
        if (value) {
            setIsErrored(false);
            onSubmit(value);
        } else {
            setIsErrored(true);
        }
    }

    return (
        <section className='search-form'>
            <form
                className={`search-form__form ${isErrored ? ' search-form__form_errored' : ''}`}
                onSubmit={handleSubmit}
            >
                <img
                    className='search-form__search-icon'
                    src={searchIcon}
                    alt='иконка поиска'
                />
                <input
                    className='search-form__input'
                    type='text'
                    placeholder='Фильм'
                    value={value}
                    onChange={handleChange}
                    name='search'
                    required={true}
                />
                <Button
                    theme='search'
                    type='submit'
                    onClick={handleSubmit}
                />
            </form>
            {isErrored && <span className='search-form__error'>Нужно ввести ключевое слово!</span>}
            <ToggleSwitch text='Короткометражки'/>
        </section>
    )
}

export default SearchForm;
