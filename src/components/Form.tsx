import React from 'react'
import PropTypes from 'prop-types'
import './Form.css'
import arrowRight from '../assets/img/arrow-right.svg'
import Loader from './Loader'

const Form: React.FC<FormProps> = ({
  roomKey,
  isLoading,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="room-name"
          className="input-room"
          placeholder="enter room name"
          maxLength={12}
          value={roomKey}
          onChange={handleChange}
        />
      </div>
      <div>
        {/* Todo: make button accessible with Enter */}
        <button type="submit" disabled={!roomKey || roomKey.length < 3}>
          {isLoading && <Loader />}
          {!isLoading && (
            <img className="arrow-right" src={arrowRight} alt="arrow-right" />
          )}
        </button>
      </div>
    </form>
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
