import './SearchForm.css';
import searchIcon from '../../images/searchform/icon.svg';
import Button from "../Button/Button";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function SearchForm() {
    return (
        <section className='search-form'>
            <form className='search-form__form'>
                <img
                    className='search-form__search-icon'
                    src={searchIcon}
                    alt='иконка поиска'
                />
                <input
                    className='search-form__input'
                    type='text'
                    placeholder='Фильм'
                />
                <Button
                    theme='search'
                    type='submit'
                />
            </form>
            <ToggleSwitch text='Короткометражки'/>
        </section>
    )
}

export default SearchForm;
