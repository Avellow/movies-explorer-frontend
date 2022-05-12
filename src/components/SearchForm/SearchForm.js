import './SearchForm.css';
import searchIcon from '../../images/searchform/icon.svg';
import Button from "../Button/Button";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState } from "react";

function SearchForm(props) {
    const { onSubmit } = props;

    const [value, setValue] = useState(localStorage.getItem('lastSearchedMovies') || '');
    const [isErrored, setIsErrored] = useState(false);
    const [
        isShortFilmToggleChecked,
        setIsShortFilmToggleChecked
    ] = useState(!!JSON.parse(localStorage.getItem('isShortFilmToggleChecked')));

    function handleChange(e) {
        setValue(e.target.value)
    }

    function handleShortFilmCheck() {
        setIsShortFilmToggleChecked(!isShortFilmToggleChecked);
    }

    function handleSubmit() {
        localStorage.setItem('isShortFilmToggleChecked', `${isShortFilmToggleChecked}`)
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
            <ToggleSwitch
                text='Короткометражки'
                onCheck={ handleShortFilmCheck }
                isChecked={ isShortFilmToggleChecked }
            />
        </section>
    )
}

export default SearchForm;
