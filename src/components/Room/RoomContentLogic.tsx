import React from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import leaf from '../../assets/img/leaf.svg'
import { TRoom } from '../../types'

const parent = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 1, duration: 1, type: 'spring', delayChildren: 1.4 },
  },
}

const child = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, type: 'spring' },
  },
}

const RoomContent: React.FC<RoomContentProps> = ({ room, handleChange }) => {
  return (
    <motion.div
      className="RoomContent"
      initial="hidden"
      animate="visible"
      variants={parent}
    >
      <textarea
        name="room-content"
        className="room-content"
        placeholder="write to your heart's content"
        cols={28}
        rows={10}
        value={room.content}
        onChange={handleChange}
      />
      <motion.div className="footer-wrapper" variants={child}>
        <img className="leaf" src={leaf} alt="leaf" />
        <sub>
          our planes are biodegradable and only last 1 hour in nature. your
          content expires after that.
        </sub>
      </motion.div>
    </motion.div>
  )
}

export default RoomContent

RoomContent.propTypes = {
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

type RoomContentProps = {
  room: TRoom
  handleChange: (ev: any) => void
}
