import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch } from 'react-router-dom'
import RoomContext from '../contexts/RoomContext'
import { TRoomContext } from '../types'
import Clouds from '../components/Clouds'
import RoomTitleLogic from '../components/Room/RoomTitleLogic'
import RoomContentLogic from '../components/Room/RoomContentLogic'

const Room: React.FC<RoomProps> = ({ roomKey, setRoomKey }) => {
  const [isRoomInitialized, setIsRoomInitialized] = useState(false)
  const { handleRoomInitialize } = useContext<TRoomContext>(RoomContext)

  const match = useRouteMatch<MatchParams>('/:roomKey')
  const roomKeyFromParams = match?.params.roomKey || ''

  // Define the room key, either from Home or URL
  useEffect(() => {
    if (!roomKey) {
      setRoomKey(roomKeyFromParams)
    }
  }, [roomKey, setRoomKey, roomKeyFromParams])

  // Once there's a key, enter the room
  useEffect(() => {
    if (roomKey && !isRoomInitialized) {
      handleRoomInitialize(roomKey)
      setIsRoomInitialized(true)
    }
  }, [roomKey, handleRoomInitialize, isRoomInitialized])

  return (
    <>
      <Clouds />
      <RoomTitleLogic roomKey={roomKey} />
      <RoomContentLogic roomKey={roomKey} />
    </>
  )
}

export default Room

type MatchParams = {
  roomKey: string
}

Room.propTypes = {
  roomKey: PropTypes.string.isRequired,
  setRoomKey: PropTypes.func.isRequired,
}

type RoomProps = {
  roomKey: string
  setRoomKey: (roomKey: string) => void
}

// TODO
// Handle room enter logic (load from DB)
//   Use param to fetch, then once loaded, update context info
// Handle Clouds and Grid
// Reevaluate the need for Room*Logic after routes are working
// Make RoomTitleLogic receive isSaved from the context
// Check if it's possible to put roomKey back into the context instead of state in App
//   This possibly requires a new control variable such as isRoomKeyDefined (like isRoomInitialized)
