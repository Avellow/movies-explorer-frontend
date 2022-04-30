function Footer() {
    return (
        <footer className='Footer'>
            <p className='Footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='Footer__container'>
                <p className='Footer__copyright'>&copy; {new Date().getFullYear()}</p>
                <nav className='Footer__nav'>
                    <ul className='Footer__links'>
                        <li className='Footer__list-item'>
                            <a
                                className='Footer__link'
                                href='https://practicum.yandex.ru'
                            >Яндекс.Практикум</a>
                        </li>
                        <li className='Footer__list-item'>
                            <a
                                className='Footer__link'
                                href='https://github.com/Avellow'
                            >Github</a>
                        </li>
                        <li className='Footer__list-item'>
                            <a
                                className='Footer__link'
                                href='https://t.me/zellek'
                            >Telegram</a>
                        </li>
                    </ul>
                </nav>
            </div>

        </footer>
    )
}

export default Footer;
