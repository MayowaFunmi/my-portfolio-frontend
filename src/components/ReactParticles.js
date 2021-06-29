import React from 'react'
import Particles from 'react-particles-js';

function ReactParticles() {
  var style = {
    position: "fixed !important",
    left:0,
    top:0,
    width:"100%",
    height:"100%"
}
    return (  
        <div>
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
