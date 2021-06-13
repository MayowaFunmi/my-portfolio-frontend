import React, { Component } from 'react'
import MyCV from './Mayowa_cv.pdf'
import './MyResume.css'
import { Link } from 'react-router-dom'


class MyResume extends Component {

    render() {
        return (
            <div className='resume'>
                <h2>Download my resume:</h2>
                <button
                    type="button" 
                    className="btn btn-outline-success"
                >
                    <Link to={MyCV} download='Akinade_Mayowa_Resume' target='_blank'>
                        Download PDF
                    </Link>
                </button>
            </div>
        )
    }
}

export default MyResume