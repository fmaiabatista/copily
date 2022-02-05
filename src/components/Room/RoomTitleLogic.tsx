import React from 'react'
import PropTypes from 'prop-types'
import RoomTitleView from './RoomTitleView'

const RoomTitleLogic: React.FC<RoomTitleLogicProps> = ({
  roomKey,
  isSaved,
}) => {
  return <RoomTitleView roomKey={roomKey} isSaved={isSaved} />
}

export default RoomTitleLogic

RoomTitleLogic.propTypes = {
  roomKey: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
}

type RoomTitleLogicProps = {
  roomKey: string
  isSaved: boolean
}
