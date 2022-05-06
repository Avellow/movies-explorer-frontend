function AboutProject() {
    return (
        <section className='AboutProject' id='aboutProject'>
            <h2 className='section-title'>О проекте</h2>
            <div className='AboutProject__info-container'>
                <div className='AboutProject__info'>
                    <h3 className='AboutProject__info-title'>Дипломный проект включал 5&nbsp;этапов</h3>
                    <p className='AboutProject__info-subtitle'>Составление плана, работу над бэкендом,
                        вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='AboutProject__info'>
                    <h3 className='AboutProject__info-title'>На выполнение диплома ушло 5&nbsp;недель</h3>
                    <p className='AboutProject__info-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать,&nbsp;чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='AboutProject__progress-bar'>
                <div className='AboutProject__back-bar'>1 неделя</div>
                <div className='AboutProject__front-bar'>4 недели</div>
                <p className='AboutProject__bar-subtitle'>Back-end</p>
                <p className='AboutProject__bar-subtitle'>Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;
