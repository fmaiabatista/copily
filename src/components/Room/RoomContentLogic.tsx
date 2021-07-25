import React, { useContext } from 'react'
import RoomContext from '../../contexts/RoomContext'
import RoomContentView from './RoomContentView'
import { TRoomContext } from '../../types'

const RoomContent: React.FC = () => {
  const {
    room: { content: roomContent },
    handleRoomContentChange,
  } = useContext<TRoomContext>(RoomContext)

  return (
    <RoomContentView
      roomContent={roomContent}
      handleRoomContentChange={handleRoomContentChange}
    />
  )
}

export default RoomContent
