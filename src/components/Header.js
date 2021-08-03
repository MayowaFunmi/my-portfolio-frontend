import React from 'react'
import pic from './profile.jpg'
import pic2 from './profile_2.jpg'
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Header.css'

function Header() {
  return (
    <div className='header'>
      <div className='header-left'>
        <h2>Akinade Mayowa Emmanuel</h2>
        <img src={pic2} width='200px' height='200px' />
        <div className='links'>
          <a href='https://www.github.com/MayowaFunmi' target='_blank'>
            <GitHubIcon />
          </a>
        
          <a href='https://www.facebook.com/akinademayowa' target='_blank'>
            <FacebookIcon />
          </a>

          <a href='https://www.twitter.com/mayowaakinade' target='_blank'>
            <TwitterIcon />
          </a>

          <a href='https://www.linkedin.com/in/mayowaakinade' target='_blank'>
            <LinkedInIcon />
          </a>
        </div>
      </div>

      <div className='header-right'>
        <h1>What I Do:</h1>
        <p>
          I am a fullstack web developer, i take pleasure in developing web apps. 
          I build new projects to engage my brain, explore and update myself on latest technologies and i love teaching others too. 
          Kindly download my resume for more details.
        </p>
      </div>

    </div>
  )
}

export default Header
