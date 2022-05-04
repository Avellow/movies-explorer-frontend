function Navigation(props) {
    const {
        location,
        children,
        type,
    } = props;

    return (
        <nav className={`Navigation`}>
            <ul className={`Navigation__links Navigation__links_type_${type}`}>
                { children }
            </ul>
        </nav>
    )
}

export default Navigation;
