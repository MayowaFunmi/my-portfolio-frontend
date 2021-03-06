import React from 'react'
import './ProjectsCard.css'
import { Link } from 'react-router-dom'

const ProjectsCard = (props) => {
    return (
        <div className='project_cards'>
            <div className="card" style={{width:'20rem'}}>
                <h5 className='card-title'>
                    <b>Name of project: </b>{props.name}
                </h5>
                <img src={props.image} className='card-img-top' width='300px' height='200px' alt={props.name} />
                <b className='card-text'>Project Description: </b>{props.description}
                <button>
                    <Link className='card-link' to={props.github_link} target='_blank'>
                        <h6 className="card-subtitle mb-2 text-muted">GitHub Link</h6>
                    </Link>
                </button>
                <button>
                    <Link className='card-link' to={props.demo_link} target='_blank'>
                        <h6 className="card-subtitle mb-2 text-muted">Demo Link</h6>
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default ProjectsCard
