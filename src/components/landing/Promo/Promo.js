import './Promo.css';
import mainLogo from '../../../images/main/worldweb.png';

function Promo() {
    return (
        <section className='promo'>
            <img
                className='promo__logo'
                src={mainLogo}
                alt='лого лендинга'
            />
            <div className='promo__info-container'>
                <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className='promo__link' href='#aboutProject'>Узнать больше</a>
            </div>
        </section>
    )
}

export default Promo;
