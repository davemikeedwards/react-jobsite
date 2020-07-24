import React from 'react'
import '../css/LandingPage.css'

const LandingPage = () => {

  const images = ['new', 'prof']
  const image = images[Math.floor(Math.random() * images.length)]
  
  return (
    <div className='landingBody'>
      <img alt='The Blurb' src={require(`../images/${image}.png`)} />
    </div>
  )
}

export default LandingPage