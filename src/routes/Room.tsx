import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import RoomTitleLogic from '../components/RoomTitleLogic'
// import RoomContentLogic from '../components/RoomContentLogic'

const Room: React.FC = () => {
  const { roomId } = useParams<RoomParams>()
  // const [isSaved, setIsSaved] = useState<boolean>(true)

  // const handleRoomContentChange = (ev: any) => {
  //   const content = ev.target.value

  //   // setRoom({ ...room, content })
  //   setIsSaved(false)

  //   clearTimeout(requestTimeout)
  //   setRequestTimeout(
  //     window.setTimeout(() => {
  //       updateRoom(content).then(() => setIsSaved(true))
  //     }, 1500)
  //   )
  // }

  return (
    <div>
      Room: {roomId}
      {/* <RoomTitleLogic roomId={roomId} isSaved={isSaved} /> */}
      {/* <RoomContentLogic roomId={roomId} /> */}
    </div>
  )
}

export default Room

type RoomParams = {
  roomId: string
}
