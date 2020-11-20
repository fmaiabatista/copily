import React from 'react'
import PropTypes from 'prop-types'
import './TitleRoom.css'
import paperplane from './assets/img/paperplane.svg'
import arrowLeft from './assets/img/arrow-left.svg'

const TitleRoom: React.FC<TitleRoomProps> = ({
  roomName = '',
  isSaved = false,
}) => {
  return (
    <div className="TitleRoom">
      {/* <div className="title-wrapper"> */}
      <img className="arrow-left" src={arrowLeft} alt="arrow-left" />
      <h1>{roomName}</h1>
      <div className="save-wrapper">
        {isSaved && <p>autosaved</p>}
        {!isSaved && <p>saving...</p>}
        <img className="paperplane" src={paperplane} alt="paperplane" />
      </div>
      {/* </div> */}
    </div>
  )
}

export default TitleRoom

TitleRoom.propTypes = {
  roomName: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
}

type TitleRoomProps = {
  roomName: string
  isSaved: boolean
}
