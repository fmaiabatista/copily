import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './RoomTitleView.css'
import { motion } from 'framer-motion'
import arrowLeft from '../../assets/img/arrow-left.svg'

const parent = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.4 } },
}

const child = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
}

const RoomTitle: React.FC<RoomTitleProps> = ({ roomId, isSaved }) => {
  return (
    <motion.div
      className="RoomTitle"
      initial="hidden"
      animate="visible"
      variants={parent}
    >
      <motion.div className="title-wrapper" variants={child}>
        <Link to="/">
          <img className="arrow-left" src={arrowLeft} alt="arrow-left" />
        </Link>
        <h1>{roomId}</h1>
      </motion.div>

      <motion.div className="save-status" variants={child} key={`${isSaved}`}>
        {isSaved ? 'autosaved' : 'saving...'}
      </motion.div>
    </motion.div>
  )
}

export default RoomTitle

RoomTitle.propTypes = {
  roomId: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
}

type RoomTitleProps = {
  roomId: string
  isSaved: boolean
}
