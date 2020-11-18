import React from 'react'
import './Title.css'
import paperplane from './assets/img/paperplane.svg'

const Title: React.FunctionComponent = () => {
  return (
    <div className="Title">
      <div className="title-wrapper">
        <h1>copily</h1>
        <img className="paperplane" src={paperplane} alt="paperplane" />
      </div>
      <p>easy text sharing across devices</p>
    </div>
  )
}

export default Title
