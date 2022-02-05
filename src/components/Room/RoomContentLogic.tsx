import React from 'react'
import PropTypes from 'prop-types'
import RoomContentView from './RoomContentView'

const RoomContentLogic: React.FC<RoomContentLogicProps> = ({
  roomContent,
  handleRoomContentChange,
}) => {
  return (
    <RoomContentView
      roomContent={roomContent}
      handleRoomContentChange={handleRoomContentChange}
    />
  )
}

export default RoomContentLogic

RoomContentLogic.propTypes = {
  roomContent: PropTypes.string.isRequired,
  handleRoomContentChange: PropTypes.func.isRequired,
}

type RoomContentLogicProps = {
  roomContent: string
  handleRoomContentChange: (ev: any) => void
}
