import React from 'react'
import './TitleHome.css'
import paperplane from '../assets/img/paperplane.svg'

const TitleHome: React.FC = () => {
  return (
    <div className="TitleHome">
      <div className="title-wrapper">
        <h1>copily</h1>
        <img className="paperplane" src={paperplane} alt="paperplane" />
      </div>
      <p>easy text sharing across devices</p>
    </div>
  )
}

export default TitleHome
