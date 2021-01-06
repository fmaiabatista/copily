import React from 'react'
import PropTypes from 'prop-types'
import './UserContent.css'
import { motion } from 'framer-motion'
import leaf from '../assets/img/leaf.svg'
import { TRoom } from '../types'

const variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 1, duration: 1, type: 'spring' },
  },
}

const UserContent: React.FC<UserContentProps> = ({ room, handleChange }) => {
  return (
    <motion.div
      className="UserContent"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
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
    </motion.div>
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
