import './AboutProject.css';

function AboutProject() {
    return (
        <section className='about-project' id='aboutProject'>
            <h2 className='section-title'>О проекте</h2>
            <div className='about-project__info-container'>
                <div className='about-project__info'>
                    <h3 className='about-project__info-title'>Дипломный проект включал 5&nbsp;этапов</h3>
                    <p className='about-project__info-subtitle'>Составление плана, работу над бэкендом,
                        вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__info'>
                    <h3 className='about-project__info-title'>На выполнение диплома ушло 5&nbsp;недель</h3>
                    <p className='about-project__info-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать,&nbsp;чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='about-project__progress-bar'>
                <div className='about-project__back-bar'>1 неделя</div>
                <div className='about-project__front-bar'>4 недели</div>
                <p className='about-project__bar-subtitle'>Back-end</p>
                <p className='about-project__bar-subtitle'>Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;
