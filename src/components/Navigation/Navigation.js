import './Navigation.css';
import { Children } from "react";

function Navigation(props) {
    const {
        children,
        type,
    } = props;


    return (
        <nav className={`navigation`}>
            <ul className={`navigation__links navigation__links_type_${type}`}>
                { Children.map(children, (child, index) => (
                    <li key={index} style={child.props.upperspace && {marginTop: 'auto'}}>
                        { child }
                    </li>
                )) }
            </ul>
        </nav>
    )
}

export default Navigation;
