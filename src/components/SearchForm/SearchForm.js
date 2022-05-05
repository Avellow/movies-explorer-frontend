import searchIcon from '../../images/searchform/icon.svg';
import Button from "../Button/Button";
import ToogleSwitch from "../ToogleSwitch/ToogleSwitch";

function SearchForm() {
    return (
        <section className='SearchForm'>
            <form className='SearchForm__form'>
                <img
                    className='SearchForm__search-icon'
                    src={searchIcon}
                    alt='иконка поиска'
                />
                <input
                    className='SearchForm__input'
                    type='text'
                    placeholder='Фильм'
                />
                <Button
                    theme='search'
                />
            </form>
            <ToogleSwitch text='Короткометражки'/>
        </section>
    )
}

export default SearchForm;
