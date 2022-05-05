import './Promo.css';
import mainLogo from '../../images/main/worldweb.png';

function Promo() {
    return (
        <section className='Promo'>
            <img
                className='Promo__logo'
                src={mainLogo}
                alt='лого лендинга'
            />
            <div className='Promo__info-container'>
                <h1 className='Promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className='Promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className='Promo__link' href='#aboutProject'>Узнать больше</a>
            </div>
        </section>
    )
}

export default Promo;
