import logo from "../../images/header/logo.svg";
import {NavLink} from "react-router-dom";

function Logo(props) {
    const {
        marginBottom = 0,
    } = props;

    return (
        <NavLink to='/' style={{ fontSize: 0, marginBottom }} className='Logo'>
            <img
                className='Logo__icon'
                src={ logo }
                alt='логотип'
            />
        </NavLink>
    )
}

export default Logo;
