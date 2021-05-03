import React from 'react'

function SkillsList(props) {
    return (
        <div>
            {props.skills.map(skill => (
                <div key={skill}>
                    {skill}
                </div>  
            ))}
        </div>
    )
}

export default SkillsList
