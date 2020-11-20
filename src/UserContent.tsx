import React from 'react'
import './UserContent.css'
import leaf from './assets/img/leaf.svg'

const UserContent: React.FC = () => {
  return (
    <div className="UserContent">
      <textarea
        name="user-content"
        className="user-content"
        placeholder="write to your heart's content"
        cols={28}
        rows={10}
      />
      <div className="footer-wrapper">
        <img className="leaf" src={leaf} alt="leaf" />
        <sub>
          our planes are biodegradable and only last 1 hour in nature. your
          content expires after that.
        </sub>
      </div>
    </div>
  )
}

export default UserContent
