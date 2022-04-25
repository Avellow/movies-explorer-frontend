import './Header.css';
import logo from '../../images/header/logo.svg';
import Button from "../Button/Button";

function Header() {
    return (
        <header className='header'>
            <img
                className='header__logo'
                src={ logo }
                alt='логотип'
            />
            <div className='header__buttons-container'>
                <Button text='Регистрация' theme='light'/>
                <Button text='Войти' theme='main'/>
            </div>
        </header>
    )
}

export default Header;
