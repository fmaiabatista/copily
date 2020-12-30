import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './UserContent.css'
import leaf from '../assets/img/leaf.svg'
import { TRoom } from '../types'

const UserContent: React.FC<UserContentProps> = ({ room, handleChange }) => {
  useEffect(() => {
    // if room.expiresAt < now, should invoke handleChange passing clearing room content
  }, [])

  // if (error) {
  //   return <div>Error: {error.message}</div>
  // }

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="UserContent">
      <textarea
        name="user-content"
        className="user-content"
        placeholder="write to your heart's content"
        cols={28}
        rows={10}
        value={room.content}
        onChange={handleChange}
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

UserContent.propTypes = {
  room: PropTypes.shape({
    key: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    expiresAt: PropTypes.shape({
      seconds: PropTypes.number.isRequired,
      nanoseconds: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
}

type UserContentProps = {
  room: TRoom
  handleChange: (ev: any) => void
}
