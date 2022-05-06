import './Navigation.css';

function Navigation(props) {
    const {
        children,
        type,
    } = props;

    return (
        <nav className={`navigation`}>
            <ul className={`navigation__links navigation__links_type_${type}`}>
                { children }
            </ul>
        </nav>
    )
}

export default Navigation;
