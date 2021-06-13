import React, { Component } from 'react'
import ProjectsCard from './ProjectsCard'
import './Projects.css'

class Projects extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            allProjects: []
        }
    }

    componentWillMount() {
        this.fetchProjects()
    }

    fetchProjects() {
        fetch('http://127.0.0.1:8000/portfolio/list_projects/')
        .then(response => response.json())
        .then(data =>
            this.setState({
                allProjects: data
            })
            )
        .catch(function(error) {
            console.log('ERROR: ', error)
        })
    }
    
    render() {
        var projects = this.state.allProjects
        return (
            <div className='projects'>
                {projects.map(function(project){
                    return(
                        <div key={project.id}>
                            <ProjectsCard
                                name={project.name}
                                description={project.description}
                                github_link={project.github_link}
                                demo_link={project.demo_link}
                                image={project.image}
                            />
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Projects
