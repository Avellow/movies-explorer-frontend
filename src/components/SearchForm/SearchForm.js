import searchIcon from '../../images/searchform/icon.svg';
import Button from "../Button/Button";

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
            <input
                className='SearchForm__switch'
                id='switch'
                type='checkbox'
            />
            <label
                for='switch'
            >Короткометражки</label>
        </section>
    )
}

export default SearchForm;
