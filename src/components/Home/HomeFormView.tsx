import React from 'react'
import PropTypes from 'prop-types'
import './HomeFormView.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import arrowRight from '../../assets/img/arrow-right.svg'

const variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 1, duration: 1, type: 'spring' },
  },
}

const HomeFormView: React.FC<HomeFormViewProps> = ({
  isDisabled,
  roomKey,
  handleRoomKeyChange,
}) => {
  return (
    <motion.div
      className="HomeForm"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div>
        <input
          type="text"
          name="room-name"
          className="input-room"
          placeholder="enter room name"
          maxLength={12}
          value={roomKey}
          onChange={handleRoomKeyChange}
        />
      </div>
      <button type="button" disabled={isDisabled}>
        <Link
          to={`/${roomKey}`}
          style={{ pointerEvents: isDisabled ? 'none' : 'all' }}
        >
          <img className="arrow-right" src={arrowRight} alt="arrow-right" />
        </Link>
      </button>
    </motion.div>
  )
}

export default HomeFormView

HomeFormView.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  roomKey: PropTypes.string.isRequired,
  handleRoomKeyChange: PropTypes.func.isRequired,
}

type HomeFormViewProps = {
  isDisabled: boolean
  roomKey: string
  handleRoomKeyChange: (ev: any) => void
}

// TODO
// Changed from FORM element so Enter is not being listened to
// Button and Anchor now need to be disabled together
// "pointer-events: none" won't work for Enter key press
