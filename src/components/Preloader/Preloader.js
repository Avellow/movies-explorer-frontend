import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    const {
        isSmall = false,
    } = props;

    return (
        <div className="preloader" style={isSmall ? {transform: 'scale(0.5)'} : null}>
            <div className="preloader__container">
                <span className="preloader__round" />
            </div>
        </div>
    )
};

export default Preloader
