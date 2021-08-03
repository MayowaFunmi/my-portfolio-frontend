import React from 'react';
import Typed from 'react-typed';
import { Link } from 'react-router-dom'
import './Particle.css'

const Particle = () => {
    return (
        <div className='container-fluid header-wrapper particle'>
            <div className='main-info'>
                <h1>Affable Digital Services</h1>
                <Typed 
                    className='typed-text'
                    strings={['Areas of expertise:...', 'Web Design', 'Web Development', 'Digital Marketing']}
                    typeSpeed={100}
                    backSpeed={50}
                    loop
                />
                <Link to='/contact_me' className='btn-main-offer'>contact me</Link>
            </div>
        </div>
    )
}

export default Particle