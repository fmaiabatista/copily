import React from 'react'
import './TitleApp.css'
import paperplane from './assets/img/paperplane.svg'

const TitleApp: React.FC = () => {
  return (
    <div className="TitleApp">
      <div className="title-wrapper">
        <h1>copily</h1>
        <img className="paperplane" src={paperplane} alt="paperplane" />
      </div>
      <p>easy text sharing across devices</p>
    </div>
  )
}

export default TitleApp
