import React, { useContext } from 'react'
import RoomContext from '../../contexts/RoomContext'
import HomeFormView from './HomeFormView'
import { TRoomContext } from '../../types'

const HomeFormLogic: React.FC = () => {
  const { room, handleRoomKeyChange } = useContext<TRoomContext>(RoomContext)

  return (
    <HomeFormView
      isDisabled={!room.key}
      roomKey={room.key}
      handleRoomKeyChange={handleRoomKeyChange}
    />
  )
}

export default HomeFormLogic
