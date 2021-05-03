import React from 'react'
import pic from './profile.jpg'
import GitHubIcon from '@material-ui/icons/GitHub';

function Header() {
  return (
    <div className='header'>
      <h2>Akinade Mayowa Emmanuel</h2>
      <img src={pic} width='200px' height='200px' />
      <GitHubIcon />
    </div>
  )
}

export default Header
