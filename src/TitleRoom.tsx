import React from 'react'
import PropTypes from 'prop-types'
import './TitleRoom.css'
import paperplane from './assets/img/paperplane.svg'
import arrowLeft from './assets/img/arrow-left.svg'

const TitleRoom: React.FC<TitleRoomProps> = ({
  roomName = '',
  isSaved = false,
  handleClick,
}) => {
  return (
    <div className="TitleRoom">
      <button type="button" onClick={handleClick}>
        <img className="arrow-left" src={arrowLeft} alt="arrow-left" />
      </button>
      <h1>{roomName}</h1>
      <div className="save-wrapper">
        {isSaved && <p>autosaved</p>}
        {!isSaved && <p>saving...</p>}
        <img className="paperplane" src={paperplane} alt="paperplane" />
      </div>
    </div>
  )
}

export default TitleRoom

TitleRoom.propTypes = {
  roomName: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

type TitleRoomProps = {
  roomName: string
  isSaved: boolean
  handleClick: () => void
}
