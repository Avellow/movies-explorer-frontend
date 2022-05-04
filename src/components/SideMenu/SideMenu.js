import Navigation from "../Navigation/Navigation";
import {popupMenuLinks} from "../../utils/constants";
import {NavLink} from "react-router-dom";
import icon from "../../images/header/accbtn.svg";
import Popup from "../Popup/Popup";

function SideMenu(props) {
    const {
        isOpened,
        onClose,
    } = props;

    return (
        <aside>
            <Popup
                name='menu'
                isOpened={isOpened}
                onClose={onClose}
            >
                <Navigation
                    loggedIn={true}
                    location='popup'
                    type='side'
                >
                    {popupMenuLinks.map(({to, text}, i) => (
                        <li key={i}>
                            <NavLink
                                to={to}
                                className='Navigation__link'
                                activeStyle={{ textDecoration: "underline" }}
                            >
                                { text }
                            </NavLink>
                        </li>
                    ))}
                    <li style={{ margin: 'auto 0 0' }}>
                        <NavLink
                            to='/profile'
                            className='Navigation__link_type_profile'
                            style={{ display: 'flex' }}
                        >
                            Аккаунт
                            <img
                                src={icon}
                                alt='профиль'
                            />
                        </NavLink>
                    </li>
                </Navigation>
            </Popup>
        </aside>
    )
}

export default SideMenu;
