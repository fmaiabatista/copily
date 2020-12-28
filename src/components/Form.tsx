import React from 'react'
import PropTypes from 'prop-types'
import './Form.css'
import arrowRight from '../assets/img/arrow-right.svg'

const Form: React.FC<FormProps> = ({
  roomKey = '',
  handleChange,
  handleClick,
}) => {
  return (
    <div className="Form">
      <div>
        <input
          type="text"
          name="room-name"
          className="input-room"
          placeholder="enter room name"
          value={roomKey}
          onChange={handleChange}
        />
      </div>
      <div>
        {/* Todo: make button accessible with Enter */}
        <button type="button" onClick={handleClick}>
          <img className="arrow-right" src={arrowRight} alt="arrow-right" />
        </button>
      </div>
    </div>
  )
}

export default Form

Form.propTypes = {
  roomKey: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}

type FormProps = {
  roomKey: string
  handleChange: (ev: any) => void
  handleClick: () => void
}
