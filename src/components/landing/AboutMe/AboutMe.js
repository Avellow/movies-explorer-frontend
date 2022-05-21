import './AboutMe.css';
import authorPhoto from '../../../images/author-photo/IMG_1864.jpeg';
import arrow from '../../../images/arrow/arrow.svg';
import SectionTitle from "../section-title/SectionTitle";

function AboutMe() {
    return (
        <section className='about-me'>
            <SectionTitle text='О студенте' />
            <div className='about-me__info-container'>
                <div className='about-me__bio'>
                    <h3 className='about-me__title'>Дмитрий</h3>
                    <p className='about-me__subtitle'>Фронтенд-разработчик, 28 лет</p>
                    <p className='about-me__text'>Я родился и живу в Москве,
                        закончил факультет строительства МГСУ. Есть жена и сын.
                        Люблю заниматься спортом, а в частности тренажерный зал.
                        Недавно начал кодить и очень втянулся в этот процесс.
                        С конца 2015 года работаю в сфере технического обслуживания зданий
                        и сооружений. После того, как прошёл курс по веб-разработке,
                        начал активно искать работу по этому направлению. Буду рад работать
                        плечом к плечу с опытными коллегами.
                    </p>
                    <ul className='about-me__contacts'>
                        <li className='about-me__contact'>
                            <a
                                className='about-me__contact-link'
                                href='https://t.me/zellek'
                                target='_blank'
                                rel="noreferrer"
                            >Telegram</a>
                        </li>
                        <li className='about-me__contact'>
                            <a
                                className='about-me__contact-link'
                                href='https://github.com/Avellow'
                                target='_blank'
                                rel="noreferrer"
                            >Github</a>
                        </li>
                    </ul>
                </div>
                <img
                    className='about-me__photo'
                    src={authorPhoto}
                    alt='фото автора'
                />
            </div>
            <h3 className='about-me__portfolio-title'>Портфолио</h3>
            <ul className='about-me__projects'>
                <li className='about-me__list-item'>
                    <a
                        className='about-me__project'
                        href='https://github.com/Avellow/how-to-learn'
                        target='_blank'
                        rel="noreferrer"
                    >
                        <h4 className='about-me__project-name'>Статичный сайт</h4>
                        <img
                            className='AboutMe__arrow-icon'
                            src={arrow}
                            alt='стрелка'
                        />
                    </a>
                </li>
                <li className='about-me__list-item'>
                    <a
                        className='about-me__project'
                        href='https://github.com/Avellow/russian-travel'
                        target='_blank'
                        rel="noreferrer"
                    >
                        <h4 className='about-me__project-name'>Адаптивный сайт</h4>
                        <img
                            className='AboutMe__arrow-icon'
                            src={arrow}
                            alt='стрелка'
                        />
                    </a>
                </li>
                <li className='about-me__list-item'>
                    <a
                        className='about-me__project'
                        href='https://github.com/Avellow/react-mesto-api-full'
                        target='_blank'
                        rel="noreferrer"
                    >
                        <h4 className='about-me__project-name'>Одностраничное приложение</h4>
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
