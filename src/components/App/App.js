import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Form from "../Form/Form";
import Auth from "../Auth/Auth";
import Input from "../Input/Input";
import NotFound from "../NotFound/NotFound";

function App() {
    return (
        <div className="app">
            <Auth>
                <Form
                    title='Добро пожаловать!'
                    buttonText='Зарегистрироваться'
                    hintText='Уже зарегистрированы?'
                    hintLinkText='Войти'
                >
                    <Input name='Имя' />
                    <Input name='E-mail' type='email' />
                    <Input name='Пароль' type='password' />
                </Form>
            </Auth>
            {/*<Auth>
                <Form
                    title='Рады видеть!'
                    buttonText='Войти'
                    hintText='Ещё не зарегистрированы?'
                    hintLinkText='Регистрация'
                >
                    <Input name='E-mail' type='email' />
                    <Input name='Пароль' type='password' />
                </Form>
            </Auth>*/}
        </div>
    );
}

export default App;
