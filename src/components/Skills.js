import React from 'react'
import SkillsList from './SkillsList'
import './Skills.css'

const Skills = () => {

    const frontend = ['JavaScript', 'jQuery/Ajax', 'React/Redux','HTML','CSS','Bootstrap','MaterialUI']
    const backend = ['Python', 'Django', 'RESTful API', 'PostgreSQL']
    const gui = ['Python', 'tkinter']

    return (
        <div className='skill_card'>
            <div className="card" style={{width:'18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Frontend Tech skills:</h5>
                    <ul>
                        <li>
                            <SkillsList skills = {frontend} />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card" style={{width:'18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Backend Tech skills:</h5>
                    <ul>
                        <li>
                            <SkillsList skills = {backend} />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card" style={{width:'18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">GUI Skills:</h5>
                    <ul>
                        <li>
                            <SkillsList skills = {gui} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Skills
