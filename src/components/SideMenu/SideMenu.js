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
                    {popupMenuLinks.map(({to, text, id}) => (
                        <NavLink
                            key={id}
                            exact
                            to={to}
                            className='navigation__link'
                            activeStyle={{textDecoration: "underline"}}
                            onClick={onClose}
                        >
                            {text}
                        </NavLink>

                    ))}

                    <NavLink
                        to='/profile'
                        className='navigation__link navigation__link_type_profile'
                        style={{display: 'flex'}}
                        upperspace='true'
                        onClick={onClose}
                    >
                        Аккаунт
                        <img
                            src={icon}
                            alt='профиль'
                        />
                    </NavLink>
                </Navigation>
            </Popup>
        </aside>
    )
}

export default SideMenu;
