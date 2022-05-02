function Navigation(props) {
    const {
        loggedIn,
        location,
        children,
    } = props;

    return (
        <nav className={`Navigation`}>
            <ul className={`Navigation__${location}-link-list`}>
                {children}
            </ul>
        </nav>
    )
}

export default Navigation;
