import React, { Component } from 'react'
import MyCV from './Mayowa_cv.pdf'
import './MyResume.css'

class MyResume extends Component {

    render() {
        return (
            <div className='resume'>
                <h2>Download my resume:</h2>
                <button
                    type="button" 
                    className="btn btn-outline-success"
                >
                    <a href={MyCV} download='Akinade_Mayowa_Resume' target='_blank'>
                        Download PDF
                    </a>
                </button>
            </div>
        )
    }
}

export default MyResume