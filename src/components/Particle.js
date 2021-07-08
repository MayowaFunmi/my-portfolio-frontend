import React from 'react';
import Typed from 'react-typed';
import './Particle.css'

const Particle = () => {
    return (
        <div className='container-fluid header-wrapper particle'>
            <div className='main-info'>
                <h1>Web Development and Websites Promotions</h1>
                <Typed 
                    className='typed-text'
                    strings={['Areas of expertise:...', 'Web Design', 'Web Development', 'Academic Tutoring']}
                    typeSpeed={100}
                    backSpeed={50}
                    loop
                />
                <a href='#' className='btn-main-offer'>contact me</a>
            </div>
        </div>
    )
}

export default Particle