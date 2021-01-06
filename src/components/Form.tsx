import React from 'react'
import PropTypes from 'prop-types'
import './Form.css'
import { motion } from 'framer-motion'
import arrowRight from '../assets/img/arrow-right.svg'
import Loader from './Loader'

const variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 1, duration: 1, type: 'spring' },
  },
}

const Form: React.FC<FormProps> = ({
  roomKey,
  isLoading,
  handleChange,
  handleSubmit,
}) => {
  return (
    <motion.form
      className="Form"
      onSubmit={handleSubmit}
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
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={!roomKey || roomKey.length < 3 || isLoading}
        >
          {isLoading && <Loader />}
          {!isLoading && (
            <img className="arrow-right" src={arrowRight} alt="arrow-right" />
          )}
        </button>
      </div>
    </motion.form>
  )
}

export default Form

Form.propTypes = {
  roomKey: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

type FormProps = {
  roomKey: string
  isLoading: boolean
  handleChange: (ev: any) => void
  handleSubmit: (ev: any) => void
}
