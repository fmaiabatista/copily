import React from 'react'
import PropTypes from 'prop-types'
import './UserContent.css'
import leaf from './assets/img/leaf.svg'

const UserContent: React.FC<UserContentProps> = ({
  roomContent = '',
  handleChange,
}) => {
  return (
    <div className="UserContent">
      <textarea
        name="user-content"
        className="user-content"
        placeholder="write to your heart's content"
        cols={28}
        rows={10}
        value={roomContent}
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
  roomContent: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

type UserContentProps = {
  roomContent: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (ev: any) => void
}
