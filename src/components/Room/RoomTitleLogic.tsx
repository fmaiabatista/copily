import React from 'react'
import PropTypes from 'prop-types'
import RoomTitleView from './RoomTitleView'

const RoomTitleLogic: React.FC<RoomTitleLogicProps> = ({ roomId, isSaved }) => {
  return <RoomTitleView roomId={roomId} isSaved={isSaved} />
}

export default RoomTitleLogic

RoomTitleLogic.propTypes = {
  roomId: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
}

type RoomTitleLogicProps = {
  roomId: string
  isSaved: boolean
}
