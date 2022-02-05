import React, { useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'
import RoomContext from '../contexts/RoomContext'
import { TRoomContext } from '../types'
import Clouds from '../components/Clouds'
import RoomTitleLogic from '../components/Room/RoomTitleLogic'
import RoomContentLogic from '../components/Room/RoomContentLogic'

// This Route Child component needs to handle navigation coming from
// 1. Home -> Context -> Room -> Children
// 2. URL -> Room <-> Context -> Children

const Room: React.FC = () => {
  // From Home
  const {
    room: { key: roomKeyFromContext, content: roomContent },
    isSaved,
    handleRoomContentChange,
  } = useContext<TRoomContext>(RoomContext)

  // From URL
  const match = useRouteMatch<MatchParams>('/:roomKey')
  const roomKeyFromParams = match?.params.roomKey

  // Defining props to pass down
  const roomKey = roomKeyFromParams || roomKeyFromContext

  return (
    <>
      <Clouds />
      <RoomTitleLogic roomKey={roomKey} isSaved={isSaved} />
      <RoomContentLogic
        roomContent={roomContent}
        handleRoomContentChange={handleRoomContentChange}
      />
    </>
  )
}

export default Room

type MatchParams = {
  roomKey: string
}

// TODO
// Handle room enter logic (load from DB)
//   Use param to fetch, then once loaded, update context info
// Handle Clouds and Grid
// Reevaluate the need for Room*Logic after routes are working
