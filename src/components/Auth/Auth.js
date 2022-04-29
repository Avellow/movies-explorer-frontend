import logo from "../../images/header/logo.svg";

function Auth(props) {
    const {
        children,
    } = props;

    return (
        <section className='Auth'>
            <img
                className='Auth__logo'
                src={ logo }
                alt='логотип'
            />
            { children }
        </section>
    )
}

export default Auth;
