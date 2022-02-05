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

const RoomTitleView: React.FC<RoomTitleViewProps> = ({ roomKey, isSaved }) => {
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
        <h1>{roomKey}</h1>
      </motion.div>

      <motion.div className="save-status" variants={child} key={`${isSaved}`}>
        {isSaved ? 'autosaved' : 'saving...'}
      </motion.div>
    </motion.div>
  )
}

export default RoomTitleView

RoomTitleView.propTypes = {
  roomKey: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
}

type RoomTitleViewProps = {
  roomKey: string
  isSaved: boolean
}
