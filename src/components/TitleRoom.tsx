import React from 'react'
import PropTypes from 'prop-types'
import './TitleRoom.css'
import { motion } from 'framer-motion'
import arrowLeft from '../assets/img/arrow-left.svg'

const parent = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.4 } },
}

const child = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
}

const TitleRoom: React.FC<TitleRoomProps> = ({
  roomKey,
  isSaved,
  handleClick,
}) => {
  return (
    <motion.div
      className="TitleRoom"
      initial="hidden"
      animate="visible"
      variants={parent}
    >
      <motion.div className="title-wrapper" variants={child}>
        <button type="button" onClick={handleClick}>
          <img className="arrow-left" src={arrowLeft} alt="arrow-left" />
        </button>
        <h1>{roomKey}</h1>
      </motion.div>

      <motion.div className="save-status" variants={child} key={`${isSaved}`}>
        {isSaved ? 'autosaved' : 'saving...'}
      </motion.div>
    </motion.div>
  )
}

export default TitleRoom

TitleRoom.propTypes = {
  roomKey: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

type TitleRoomProps = {
  roomKey: string
  isSaved: boolean
  handleClick: () => void
}
