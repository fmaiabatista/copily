import React, { useContext } from 'react'
import HomeFormView from './HomeFormView'
import RoomContext from '../../contexts/RoomContext'
import { TRoomContext } from '../../types'

const HomeFormLogic: React.FC = () => {
  const { roomKey, setKey } = useContext<TRoomContext>(RoomContext)

  const handleChange = (ev: any) => {
    setKey(ev.target.value && ev.target.value.toLowerCase())
  }

  return (
    <HomeFormView
      isDisabled={!roomKey}
      roomKey={roomKey}
      handleChange={handleChange}
    />
  )
}

export default HomeFormLogic
