import './Footer.css';

function Footer() {
    return (
        <footer
            className='footer'
        >
            <p className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__container'>
                <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
                <nav className='Footer__nav'>
                    <ul className='footer__links'>
                        <li className='Footer__list-item'>
                            <a
                                className='footer__link'
                                href='https://practicum.yandex.ru'
                                target='_blank'
                            >Яндекс.Практикум</a>
                        </li>
                        <li className='Footer__list-item'>
                            <a
                                className='footer__link'
                                href='https://github.com/Avellow'
                                target='_blank'
                            >Github</a>
                        </li>
                        <li className='Footer__list-item'>
                            <a
                                className='footer__link'
                                href='https://t.me/zellek'
                                target='_blank'
                            >Telegram</a>
                        </li>
                    </ul>
                </nav>
            </div>

        </footer>
    )
}

export default Footer;
