import React from 'react'
import './ProjectsCard.css'

const ProjectsCard = (props) => {
    return (
        <div className='project_cards'>
            <div className="card" style={{width:'18rem'}}>
                <h5 className='card-title'>
                    <b>Name of project: </b>{props.name}
                </h5>
                <img src={props.image} className='card-img-top' width='300px' height='200px' alt={props.name} />
                <b className='card-text'>Project Description: </b>{props.description}
                <button>
                    <a className='card-link' href={props.github_link} target='_blank'>
                        <h6 class="card-subtitle mb-2 text-muted">GitHub Link</h6>
                    </a>
                </button>
                <button>
                    <a className='card-link' href={props.demo_link} target='_blank'>
                        <h6 class="card-subtitle mb-2 text-muted">Demo Link</h6>
                    </a>
                </button>
            </div>
        </div>
    )
}

export default ProjectsCard
