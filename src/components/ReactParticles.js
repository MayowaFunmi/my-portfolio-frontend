import React from 'react'
import Particles from 'react-particles-js';
import './ReactParticles.css'

function ReactParticles() {

    return (  
        <div className='particles'>
            <Particles
              params={{
                className: 'particles-canvas',
                particles: {
                  number: {
                    value: 40,
                    density: {
                      enable: true,
                      value_area: 300
                    }
                  },
                  shape: {
                    type: 'circle',
                    stroke: {
                      width: 1,
                      color: "#f9ab0a"
                    }
                  } 
                }
              }}
            />
        </div>
    )
}

export default ReactParticles
