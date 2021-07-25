import React, { useContext } from 'react'
import RoomContext from '../../contexts/RoomContext'
import RoomTitleView from './RoomTitleView'
import { TRoomContext } from '../../types'

const RoomTitleLogic: React.FC = () => {
  const {
    room: { key: roomKey },
    isSaved,
  } = useContext<TRoomContext>(RoomContext)

  return <RoomTitleView roomKey={roomKey} isSaved={isSaved} />
}

export default RoomTitleLogic
