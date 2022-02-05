import React from 'react'
import PropTypes from 'prop-types'
import './RoomContentView.css'
import { motion } from 'framer-motion'
import leaf from '../../assets/img/leaf.svg'

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

const RoomContentView: React.FC<RoomContentViewProps> = ({
  roomContent,
  handleRoomContentChange,
}) => {
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
        value={roomContent}
        onChange={handleRoomContentChange}
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

export default RoomContentView

RoomContentView.propTypes = {
  roomContent: PropTypes.string.isRequired,
  handleRoomContentChange: PropTypes.func.isRequired,
}

type RoomContentViewProps = {
  roomContent: string
  handleRoomContentChange: (ev: any) => void
}
