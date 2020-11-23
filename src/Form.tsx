import React from 'react'
import PropTypes from 'prop-types'
import './Form.css'
import arrowRight from './assets/img/arrow-right.svg'

const Form: React.FC<FormProps> = ({ handleClick }) => {
  return (
    <div className="Form">
      <div>
        <input
          type="text"
          name="room-name"
          className="input-room"
          placeholder="enter room name"
        />
      </div>
      <div>
        <button type="button" onClick={handleClick}>
          <img className="arrow-right" src={arrowRight} alt="arrow-right" />
        </button>
      </div>
    </div>
  )
}

export default Form

Form.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

type FormProps = {
  handleClick: () => void
}
