import authorPhoto from '../../images/author-photo/IMG_1864.jpeg';
import arrow from '../../images/arrow/arrow.svg';

function AboutMe() {
    return (
        <section className='AboutMe'>
            <h2 className='section-title'>Студент</h2>
            <div className='AboutMe__info-container'>
                <div className='AboutMe__bio'>
                    <h3 className='AboutMe__title'>Дмитрий</h3>
                    <p className='AboutMe__subtitle'>Фронтенд-разработчик, 28 лет</p>
                    <p className='AboutMe__text'>Я родился и живу в Москве,
                        текст текст текст текст текст текст текст текст текст текст
                        текст тексттекст тексттекст тексттекст тексттекст текст
                        текст тексттекст тексттекст тексттекст тексттекст текст
                        текст тексттекст тексттекст тексттекст тексттекст текст</p>
                    <ul className='AboutMe__contacts'>
                        <li className='AboutMe__contact'>
                            <a
                                className='AboutMe__contact-link'
                                href='https://t.me/zellek'
                                target='_blank'
                            >Telegram</a>
                        </li>
                        <li className='AboutMe__contact'>
                            <a
                                className='AboutMe__contact-link'
                                href='https://github.com/Avellow'
                                target='_blank'
                            >Github</a>
                        </li>
                    </ul>
                </div>
                <img
                    className='AboutMe__photo'
                    src={authorPhoto}
                    alt='фото автора'
                />
            </div>
            <h3 className='AboutMe__portfolio-title'>Портфолио</h3>
            <ul className='AboutMe__projects'>
                <li className='AboutMe__list-item'>
                    <a
                        className='AboutMe__project'
                        href='https://github.com/Avellow/how-to-learn'
                        target='_blank'
                    >
                        <h4 className='AboutMe__project-name'>Статичный сайт</h4>
                        <img
                            className='AboutMe__arrow-icon'
                            src={arrow}
                            alt='стрелка'
                        />
                    </a>
                </li>
                <li className='AboutMe__list-item'>
                    <a
                        className='AboutMe__project'
                        href='https://github.com/Avellow/russian-travel'
                        target='_blank'
                    >
                        <h4 className='AboutMe__project-name'>Адаптивный сайт</h4>
                        <img
                            className='AboutMe__arrow-icon'
                            src={arrow}
                            alt='стрелка'
                        />
                    </a>
                </li>
                <li className='AboutMe__list-item'>
                    <a
                        className='AboutMe__project'
                        href='https://github.com/Avellow/react-mesto-api-full'
                        target='_blank'
                    >
                        <h4 className='AboutMe__project-name'>Одностраничное приложение</h4>
                        <img
                            className='AboutMe__arrow-icon'
                            src={arrow}
                            alt='стрелка'
                        />
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default AboutMe;
